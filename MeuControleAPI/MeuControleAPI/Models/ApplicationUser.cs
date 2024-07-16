using Microsoft.AspNetCore.Identity;

namespace MeuControleAPI.Models;
public class ApplicationUser : IdentityUser {

    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    public bool Ativo { get; set; } = true;
}
