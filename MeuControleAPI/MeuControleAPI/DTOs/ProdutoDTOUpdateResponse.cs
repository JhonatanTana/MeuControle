namespace MeuControleAPI.DTOs; 
public class ProdutoDTOUpdateResponse {
  
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public DateTime DataCadastro { get; set; }
    public int CategoriaId { get; set; }
}
