using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeuControleAPI.Models;
public class ProdutosPedido {

    [Key]
    public int ProdutosPedidoId { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal PrecoTotal { get; set; }
    public int ProdutoId { get; set; }
    public int PedidoId { get; set; }
    public Produto? Produto { get; set; }
}

