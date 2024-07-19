namespace MeuControleAPI.DTOs.Request; 
public class ProdutoDTOUpdateRequest {
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public decimal Preco { get; set; }
    public bool Disponibilidade { get; set; }
    public int CategoriaId { get; set; }
}
