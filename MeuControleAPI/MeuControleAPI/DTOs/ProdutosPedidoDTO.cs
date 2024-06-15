using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs; 
public class ProdutosPedidoDTO {

    public int ProdutosPedidoId { get; set; }
    [Required]
    public int Quantidade { get; set; }
    [Required]
    public decimal PrecoTotal { get; set; }
    public int ProdutoId { get; set; }
    public int PedidoId { get; set; }
    [Required]
    public IEnumerable<Produto> Produtos { get; set; }
}
