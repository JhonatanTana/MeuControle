using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs.Resposta;
public class PedidoDTOUpdateResponse {

    public int PedidoId { get; set; }
    public string? Nome { get; set; }
    public int Mesa { get; set; }
    public DateOnly Data { get; set; }
    public bool Disponbilidade { get; set; }
    public string FormaPagamento { get; set; }
}
