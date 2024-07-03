using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs;
public class PedidoDTO {

    public int PedidoId { get; set; }
    public string? Nome { get; set; }
    public int Mesa { get; set; }
    public DateOnly Data { get; set; }
    public decimal ValorTotal { get; set; }
    public bool Disponibilidade { get; set; }
    public string? FormaPagamento { get; set; }
    public IEnumerable<ProdutosPedido>? ProdutosPedido { get; set; }
}
