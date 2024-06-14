using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface; 
public interface IProdutoRepository : IRepository<Produto> {

    Task<IPagedList<Produto>> GetProdutosAsync(ProdutosParameters produtoParams);
    Task<IPagedList<Produto>> GetProdutosFiltroPrecoAsync(ProdutoFiltroPreco produtosFiltroParams);
    Task<IEnumerable<Produto>> GetProdutosPorCategoriaAsync(int id);
}
