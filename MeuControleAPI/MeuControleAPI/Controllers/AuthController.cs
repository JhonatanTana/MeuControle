using MeuControleAPI.DTOs;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.Models;
using MeuControleAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace APICatalogo.Controllers;
[Route("[controller]")]
[ApiController]
public class AuthController : ControllerBase {

    private readonly ITokenService _tokenService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;

    public AuthController(ITokenService tokenService, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration) {

        _tokenService = tokenService;
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    [HttpPost("Login")] // Realiza a validacao do usuario
    public async Task<IActionResult> Login([FromBody] LoginModel model) {
        var user = await _userManager.FindByNameAsync(model.UserName!);

        if (user is not null && await _userManager.CheckPasswordAsync(user, model.Password!)) {

            if (!user.Ativo) {
                return Unauthorized(new { Message = "Usuário desativado." });
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim> {
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles) {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = _tokenService.GenerateAccessToken(authClaims, _configuration);
            var refreshToken = _tokenService.GenerateRefreshToken();

            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInMinutes"], out int refreshTokenValidityInMinutes);

            user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(refreshTokenValidityInMinutes);
            user.RefreshToken = refreshToken;

            await _userManager.UpdateAsync(user);

            return Ok(new {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Nome = user.UserName,
                RefreshToken = refreshToken,
                Expiration = token.ValidTo
            });
        }

        return Unauthorized();
    }

    [HttpPost("Register")] // Registra o usuario
    public async Task<IActionResult> Register([FromBody] RegisterModel model) {

        var userExists = await _userManager.FindByNameAsync(model.Username!);

        if (userExists != null) {

            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Usuario ja existente" });
        }

        ApplicationUser user = new() {

            Email = model.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = model.Username
        };

        var result = await _userManager.CreateAsync(user, model.Password!);

        if (!result.Succeeded) {

            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Falha ao criar usuario" });
        }

        return Ok(new Response { Status = "Sucesso", Message = "Usuario criado com sucesso" });
    }

    [HttpGet("Usuarios")]
    [Authorize]
    public async Task<IActionResult> GetUsuarios() {

        var users = _userManager.Users.ToList();

        var userDtos = users.Select(user => new UsuarioDTO {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Ativo = user.Ativo
        }).ToList();

        return Ok(userDtos);
    }

    [HttpPatch("ResetSenha")]
    [Authorize]
    public async Task<IActionResult> RedefinirSenha([FromBody] AtualizaSenhaRequest model ) {

        var user = await _userManager.FindByIdAsync(model.Id);

        if (user is null) {
            return NotFound();
        }

        var resultado = await _userManager.ChangePasswordAsync(user, model.SenhaAtual, model.NovaSenha);

        if (resultado.Succeeded) {
            return Ok();
        }

        return BadRequest();
    }

    [HttpPatch("Desativa")]
    [Authorize]
    public async Task<IActionResult> DesativaUsuario([FromBody] DesativaUsuarioRequest model) {

        var user = await _userManager.FindByIdAsync(model.Id);

        if (user == null) {
            return NotFound("User not found.");
        }

        user.Ativo = model.Ativo;
        var result = await _userManager.UpdateAsync(user);

        return Ok();
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteUser(string userId) {
        
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) {
            return NotFound("User not found.");
        }

        var result = await _userManager.DeleteAsync(user);
        if (result.Succeeded) {
            return Ok(result);
        }

        return BadRequest("Error deleting user.");
    }
}