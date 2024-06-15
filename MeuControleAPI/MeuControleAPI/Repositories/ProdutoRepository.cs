using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;

namespace MeuControleAPI.Repositories {
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository {


        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Produto>> GetProdutosPorCategoriaAsync(int id) {

            var produtos = await GetAllAsync();

            var produtosCategoria = produtos.Where(c => c.CategoriaId == id);
            return produtosCategoria;
        }
    }
}
