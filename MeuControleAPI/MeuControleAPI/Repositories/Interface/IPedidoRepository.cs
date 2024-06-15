using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface;
public interface IPedidoRepository : IRepository<Pedido> {

    Task<IPagedList<Pedido>> GetPedidoAbertosAsync(PedidoParameters pedidoParams);
    Task<IPagedList<Pedido>> GetPedidoFechadoAsync(PedidoParameters pedidoParams);
    Task<IPagedList<Pedido>> GetPedidoFiltroDataAsync(PedidosFiltroData produtosFiltroParams);
}
