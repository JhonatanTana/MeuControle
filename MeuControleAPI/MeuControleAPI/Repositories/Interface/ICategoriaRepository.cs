using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface {
    public interface ICategoriaRepository : IRepository<Categoria> {

        Task<IPagedList<Categoria>> GetCategoriasAsync(CategoriaParameters categoriasParams);
        Task<IPagedList<Categoria>> GetCategoriasFiltroNomeAsync(CategoriasFiltroNome categoriasParams);
    }
}
