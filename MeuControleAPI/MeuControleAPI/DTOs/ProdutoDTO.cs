using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeuControleAPI.DTOs;
public class ProdutoDTO {

    public int ProdutoId { get; set; }

    [Required]
    [StringLength(80)] // DataAnnotations
    public string? Nome { get; set; }

    [Required]
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public int CategoriaId { get; set; } // Relaciona a chave estrangeira
}
