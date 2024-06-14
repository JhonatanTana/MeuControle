using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;


namespace MeuControleAPI.Repositories;
public class PedidoRepository : Repository<Pedido>, IPedidoRepository {

    private readonly AppDbContext _context;

    public PedidoRepository(AppDbContext context) : base(context) { }

}
