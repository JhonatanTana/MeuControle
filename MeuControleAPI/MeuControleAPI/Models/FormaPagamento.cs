using System.ComponentModel.DataAnnotations;

namespace MeuControleAPI.Models;
public class FormaPagamento {

    [Key]
    [Required]
    public int FormaPagamentoId { get; set; }

    [Required]
    public string Nome { get; set; }
}
