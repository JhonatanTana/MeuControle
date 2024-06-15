using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using X.PagedList;


namespace MeuControleAPI.Repositories;
public class PedidoRepository : Repository<Pedido>, IPedidoRepository {

    private readonly AppDbContext _context;

    public PedidoRepository(AppDbContext context) : base(context) { }

    public async Task<IPagedList<Pedido>> GetPedidoAbertosAsync(PedidoParameters pedidoParams) {

        var pedidos = await GetAllAsync();

        var pedidosOrdenados = pedidos.OrderBy(p => p.PedidoId).Where(p => p.Disponibilidade = true).AsQueryable();

        var resultado = await pedidosOrdenados.ToPagedListAsync(pedidoParams.PageNumber, pedidoParams.PageSize);

        return resultado;
    }
    public async Task<IPagedList<Pedido>> GetPedidoFechadoAsync(PedidoParameters pedidoParams) {

        var pedidos = await GetAllAsync();

        var pedidosOrdenados = pedidos.OrderBy(p => p.PedidoId).Where(p => p.Disponibilidade = false).AsQueryable();

        var resultado = await pedidosOrdenados.ToPagedListAsync(pedidoParams.PageNumber, pedidoParams.PageSize);

        return resultado;
    }
    public async Task<IPagedList<Pedido>> GetPedidoFiltroDataAsync(PedidosFiltroData pedidoFiltroParams) {

        var pedidos = await GetAllQueryableAsync();

        var filtro = pedidos.Where(p => p.Disponibilidade == false);

        if (pedidoFiltroParams.DataPesquisa != DateOnly.MinValue) {

            pedidos = filtro.Where(p => p.Data == pedidoFiltroParams.DataPesquisa);
        }

        var pedidosFiltrados = await filtro.ToPagedListAsync(pedidoFiltroParams.PageNumber, pedidoFiltroParams.PageSize);

        return pedidosFiltrados;
    }
}
