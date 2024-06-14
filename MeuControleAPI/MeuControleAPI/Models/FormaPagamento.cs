using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.Models; 
public class FormaPagamento {

    [Key]
    public int PagamentoId { get; set; }

    [Required]
    public string Nome { get; set; }
}
