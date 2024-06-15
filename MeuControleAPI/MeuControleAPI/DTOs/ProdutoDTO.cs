using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.DTOs;
public class ProdutoDTO {

    public int ProdutoId { get; set; }

    [Required]
    [StringLength(80)] // DataAnnotations
    public string? Nome { get; set; }

    [Required]
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public int CategoriaId { get; set; }
}
