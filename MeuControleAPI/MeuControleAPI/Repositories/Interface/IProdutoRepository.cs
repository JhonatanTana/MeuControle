using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface; 
public interface IProdutoRepository : IRepository<Produto> {
    Task<IEnumerable<Produto>> GetProdutosPorCategoriaAsync(int id);
}
