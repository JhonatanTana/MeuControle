using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs; 
public class ProdutosPedidoDTO {

    [Required]
    public string? Produto { get; set; }
    public int Quantidade { get; set; }
    public decimal Preco { get; set; }
    public decimal PrecoTotal { get; set; }
    public int PedidoId { get; set; }
}
