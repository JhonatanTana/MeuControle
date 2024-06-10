using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using X.PagedList;

namespace MeuControleAPI.Repositories {
    public class ProdutoRepository : Repository<Produto>, IProdutoRepository {


        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context) : base(context) { }

        public async Task<IPagedList<Produto>> GetProdutosAsync(ProdutosParameters produtoParams) {

            var produtos = await GetAllAsync();

            var produtosOrdenados = produtos.OrderBy(p => p.ProdutoId).AsQueryable();

            var resultado = await produtosOrdenados.ToPagedListAsync(produtoParams.PageNumber, produtoParams.PageSize);
            return resultado;
        }

        public async Task<IPagedList<Produto>> GetProdutosFiltroPrecoAsync(ProdutoFiltroPreco produtosFiltroParams) {

            var produtos = await GetAllAsync();

            if (produtosFiltroParams.Preco.HasValue && !string.IsNullOrEmpty(produtosFiltroParams.PrecoCriterio)) {

                if (produtosFiltroParams.PrecoCriterio.Equals("maior", StringComparison.OrdinalIgnoreCase)) {

                    produtos = produtos.Where(p => p.Preco > produtosFiltroParams.Preco.Value).OrderBy(p => p.Preco);
                }
                else if (produtosFiltroParams.PrecoCriterio.Equals("menor", StringComparison.OrdinalIgnoreCase)) {

                    produtos = produtos.Where(p => p.Preco < produtosFiltroParams.Preco.Value).OrderBy(p => p.Preco);
                }
                else if (produtosFiltroParams.PrecoCriterio.Equals("igual", StringComparison.OrdinalIgnoreCase)) {

                    produtos = produtos.Where(p => p.Preco == produtosFiltroParams.Preco.Value).OrderBy(p => p.Preco);
                }
            }

            var produtosFiltrados = await produtos.ToPagedListAsync(produtosFiltroParams.PageNumber, produtosFiltroParams.PageSize);
            return produtosFiltrados;
        }

        public async Task<IEnumerable<Produto>> GetProdutosPorCategoriaAsync(int id) {

            var produtos = await GetAllAsync();

            var produtosCategoria = produtos.Where(c => c.CategoriaId == id);
            return produtosCategoria;
        }
    }
}
