using MeuControleAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MeuControleAPI.DTOs; 
public class PedidoDTO {

    public int PedidoId { get; set; }
    public string? Nome { get; set; }
    public int Mesa { get; set; }
    public string Data { get; set; } = DateTime.UtcNow.ToString();
    public decimal ValorTotal { get; set; }
    public bool Disponibilidade { get; set; }
    public FormaPagamento? FormaPagamento { get; set; }
    public ICollection<ProdutosPedido>? ProdutosPedido { get; set; }
}
