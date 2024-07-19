using MeuControleAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.DTOs;
public class ProdutoDTO {
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public int CategoriaId { get; set; }
    public string? ImagemUrl { get; set; }
    public IFormFile? file { get; set; }
}
