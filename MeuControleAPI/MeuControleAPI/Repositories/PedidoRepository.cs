using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using X.PagedList;

namespace MeuControleAPI.Repositories;
public class PedidoRepository : Repository<Pedido>, IPedidoRepository {

    private readonly AppDbContext _context;

    public PedidoRepository(AppDbContext context) : base(context) { }

    public async Task<IPagedList<Pedido>> GetPedidosAsync(PedidoParameters pedidoParams) {

        var pedidos = await GetAllAsync();

        var pedidosOrdenados = pedidos.OrderBy(p => p.PedidoId).AsQueryable();

        var resultado = await pedidosOrdenados.ToPagedListAsync(pedidoParams.PageNumber, pedidoParams.PageSize);
        return resultado;
    }
}
