using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using X.PagedList;

namespace MeuControleAPI.Repositories.Interface; 
public interface IPedidoRepository : IRepository<Pedido> {

    Task<IPagedList<Pedido>> GetPedidosAsync(PedidoParameters pedidoParams);
}
