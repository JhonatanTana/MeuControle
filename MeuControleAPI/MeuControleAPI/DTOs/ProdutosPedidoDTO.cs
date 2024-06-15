using MeuControleAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.DTOs;
public class ProdutosPedidoDTO {

    public int ProdutosPedidoId { get; set; }
    [Required]
    public int Quantidade { get; set; }
    [Required]
    public decimal PrecoTotal { get; set; }
    public int ProdutoId { get; set; }
    public int PedidoId { get; set; }
    public Produto Produtos { get; set; }
}
