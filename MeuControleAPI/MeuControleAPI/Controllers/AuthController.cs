using MeuControleAPI.DTOs;
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

    [HttpPost]
    [Route("login")] // Realiza a validacao do usuario
    public async Task<IActionResult> Login([FromBody] LoginModel model) {
        var user = await _userManager.FindByNameAsync(model.UserName!);

        if (user is not null && await _userManager.CheckPasswordAsync(user, model.Password!)) {

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

            _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInMinutes"],
                               out int refreshTokenValidityInMinutes);

            user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(refreshTokenValidityInMinutes);

            user.RefreshToken = refreshToken;

            await _userManager.UpdateAsync(user);

            return Ok(new {

                Token = new JwtSecurityTokenHandler().WriteToken(token),
                RefreshToken = refreshToken,
                Expiration = token.ValidTo
            });
        }

        return Unauthorized();
    }

    [HttpPost]
    [Route("register")] // Registra o usuario
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

    [HttpPost]
    [Route("refresh-token")] // Atualiza o token
    public async Task<IActionResult> RefreshToken(TokenModel tokenModel) {

        if (tokenModel is null) {

            return BadRequest("Requisição invalida");
        }

        string? acessToken = tokenModel.AccessToken ?? throw new ArgumentNullException(nameof(tokenModel));
        string? refreshToken = tokenModel.RefreshToken ?? throw new ArgumentNullException(nameof(tokenModel));

        var principal = _tokenService.GetPrincipalFromExpiredToken(acessToken!, _configuration);

        if (principal == null) {

            return BadRequest("Token/Refresh Token invalido");
        }

        string username = principal.Identity.Name;

        var user = await _userManager.FindByNameAsync(username);

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now) {

            return BadRequest("Token invalido");
        }

        var newAcessToken = _tokenService.GenerateAccessToken(principal.Claims.ToList(), _configuration);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _userManager.UpdateAsync(user);

        return new ObjectResult(new {

            acessToken = new JwtSecurityTokenHandler().WriteToken(newAcessToken),
            refreshToken = newRefreshToken
        });
    }

    [HttpPost]
    [Authorize(Policy = "ExclusiveOnly")]
    [Route("Revoke/{username}")] // Deleta o refresh token 
    public async Task<IActionResult> Revoke(string username) {
        var user = await _userManager.FindByNameAsync(username);

        if (user == null) return BadRequest("Invalid user name");

        user.RefreshToken = null;

        await _userManager.UpdateAsync(user);

        return NoContent();
    }

    [HttpPost]
    [Authorize(Policy = "SuperAdminOnly")]
    [Route("CreateRole")] // Cria regras
    public async Task<IActionResult> CreateRole(string roleName) {

        var roleExist = await _roleManager.RoleExistsAsync(roleName);

        if (!roleExist) {

            var roleResult = await _roleManager.CreateAsync(new IdentityRole(roleName));

            if (roleResult.Succeeded) {

                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = $"Regra {roleName} adicionada com sucesso " });
            }
            else {

                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = $"Erro ao adicionar a regra {roleName}" });
            }
        }

        return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "A regra ja existe" });
    }

    [HttpPost]
    [Authorize(Policy = "SuperAdminOnly")]
    [Route("AddUserToRole")] // Define a regra ao usuario
    public async Task<IActionResult> AddUserToRole(string email, string roleName) {

        var user = await _userManager.FindByEmailAsync(email);

        if (user != null) {

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (result.Succeeded) {

                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = $"Adicionado a regra {roleName} ao usuario {user.UserName}" });
            }
            else {

                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = $"Erro ao adicionar a regra {roleName} ao usuario {user.UserName}" });
            }
        }

        return BadRequest(new { error = "Usuario nao encontrado" });
    }
}