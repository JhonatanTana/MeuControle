using MeuControleAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.DTOs;
public class CategoriaDTO {

    public int CategoriaId { get; set; }
    [Required]
    [StringLength(80)] // DataAnnotations
    public string? Nome { get; set; }
    public bool Disponibilidade { get; set; }
    public List<Produto>? Produtos { get; set; }
}
