using MeuControleAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeuControleAPI.DTOs.Request;
public class PedidoDTOUpdateResquest {
    public int PedidoId { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal ValorTotal { get; set; }
    public bool Disponibilidade { get; set; }
    public string FormaPagamento { get; set; }
}
