using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MeuControleAPI.Models; 
public class ProdutosPedido {

    [Key]
    public int ProdutosPedidoId { get; set; }

    [Required]
    public string? Produto { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Preco { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal PrecoTotal { get; set; }

    [Required]
    public int PedidoId { get; set; }

    [JsonIgnore]
    public Pedido? Pedido { get; set; }
}

