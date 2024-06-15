using MeuControleAPI.Models;

namespace MeuControleAPI.Repositories.Interface;
public interface IProdutoRepository : IRepository<Produto> {
    Task<IEnumerable<Produto>> GetProdutosPorCategoriaAsync(int id);
}
