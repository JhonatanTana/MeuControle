using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface {
    public interface IProdutosPedidoRepository : IRepository<ProdutosPedido> {

        Task<IPagedList<ProdutosPedido>> GetProdutosPedidoAsync(ProdutosPedidoParameters produtosPedidoParams);
    }
}
