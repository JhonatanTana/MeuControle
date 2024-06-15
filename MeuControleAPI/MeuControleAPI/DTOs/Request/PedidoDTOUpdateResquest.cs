using System.ComponentModel.DataAnnotations.Schema;

namespace MeuControleAPI.DTOs.Request;
public class PedidoDTOUpdateResquest {

    [Column(TypeName = "decimal(10,2)")]
    public decimal ValorTotal { get; set; }
    public bool Disponibilidade { get; set; }
}
