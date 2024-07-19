namespace MeuControleAPI.DTOs.Resposta; 
public class ProdutoDTOUpdateResponse {
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public int CategoriaId { get; set; }
}
