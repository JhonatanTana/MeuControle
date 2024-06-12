namespace MeuControleAPI.Repositories.Interface {
    public interface IUnitOfWork {
        IProdutoRepository ProdutoRepository { get; }
        ICategoriaRepository CategoriaRepository { get; }
        IPedidoRepository PedidoRepository { get; }
        IProdutosPedidoRepository ProdutosPedidoRepositories { get; }
        Task CommitAsync();
    }
}
