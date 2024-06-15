using MeuControleAPI.Context;
using MeuControleAPI.Repositories.Interface;

namespace MeuControleAPI.Repositories;
public class UnitOfWork : IUnitOfWork {

    private IProdutoRepository? _produtoRepo;
    private ICategoriaRepository? _categoriaRepo;
    private IPedidoRepository? _pedidoRepo;
    private IProdutosPedidoRepository? _produtosPedidoRepo;
    private IFormaPagamentoRepository? _formaPagamentoRepo;
    public AppDbContext _context;

    public UnitOfWork(AppDbContext context) {

        _context = context;
    }

    public IProdutoRepository ProdutoRepository {

        get {
            return _produtoRepo = _produtoRepo ?? new ProdutoRepository(_context);
        }
    }

    public ICategoriaRepository CategoriaRepository {

        get {
            return _categoriaRepo = _categoriaRepo ?? new CategoriaRepository(_context);
        }
    }

    public IPedidoRepository PedidoRepository {

        get {

            return _pedidoRepo = _pedidoRepo ?? new PedidoRepository(_context);
        }
    }

    public IProdutosPedidoRepository ProdutosPedidoRepository {

        get {

            return _produtosPedidoRepo = _produtosPedidoRepo ?? new ProdutosPedidoRepository(_context);
        }
    }

    public IFormaPagamentoRepository FormaPagamentoRepository {

        get {

            return _formaPagamentoRepo = _formaPagamentoRepo ?? new FormaPagamentoRepository(_context);
        }
    }

    public async Task CommitAsync() {

        await _context.SaveChangesAsync();
    }

    public async Task Dispose() {

        await _context.SaveChangesAsync();
    }
}
