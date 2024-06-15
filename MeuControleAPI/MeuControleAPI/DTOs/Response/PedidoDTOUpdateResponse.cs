using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Resposta; 
public class PedidoDTOUpdateResponse {

    public int PedidoId { get; set; }
    public string? Nome { get; set; }
    public int Mesa { get; set; }
    public DateTime Data { get; set; }
    public FormaPagamento? FormaPagamento { get; set; }
    public ICollection<ProdutosPedido>? ProdutosPedido { get; set; }
}
