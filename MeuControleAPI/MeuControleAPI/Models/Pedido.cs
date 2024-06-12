using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeuControleAPI.Models; 
public class Pedido {

    [Required]
    public int PedidoId { get; set; }

    [Required]
    public string Nome { get; set; }

    [Required]
    [Column(TypeName = "int(2)")]
    public int Mesa { get; set; }

    [Required]
    public DateOnly Data { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal ValorTotal { get; set; }

    [Required]
    public bool Disponibilidade { get; set; }
    public ICollection<ProdutosPedido> ProdutosPedido { get; set; }
}
