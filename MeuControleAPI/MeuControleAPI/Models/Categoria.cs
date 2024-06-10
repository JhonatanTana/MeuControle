using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MeuControleAPI.Models;

[Table("Categoria")]
public class Categoria {

    [Key]
    public int CategoriaId { get; set; }

    [Required]
    [StringLength(80)]
    public string Nome { get; set; }

    [Required]
    public bool Disponibilidade { get; set; }

    [JsonIgnore]
    public ICollection<Produto>? Produtos { get; set; }
}
