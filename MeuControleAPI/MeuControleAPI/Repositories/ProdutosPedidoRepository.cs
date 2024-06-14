using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using X.PagedList;

namespace MeuControleAPI.Repositories;
public class ProdutosPedidoRepository : Repository<ProdutosPedido>, IProdutosPedidoRepository {

    private readonly AppDbContext _context;

    public ProdutosPedidoRepository(AppDbContext context) : base(context) { }

}
