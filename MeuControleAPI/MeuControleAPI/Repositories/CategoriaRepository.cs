using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using X.PagedList;

namespace MeuControleAPI.Repositories {
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository {

        public CategoriaRepository(AppDbContext context) : base(context) {
        }
        public async Task<IPagedList<Categoria>> GetCategoriasAsync(CategoriaParameters categoriaParams) {

            var categorias = await GetAllAsync();

            var categoriasOrdenadas = categorias.OrderBy(c => c.CategoriaId).AsQueryable();

            var resultado = await categoriasOrdenadas.ToPagedListAsync(categoriaParams.PageNumber, categoriaParams.PageSize);

            return resultado;
        }
        public async Task<IPagedList<Categoria>> GetCategoriasFiltroNomeAsync(CategoriasFiltroNome categoriasParams) {

            var categorias = await GetAllAsync();

            if (!string.IsNullOrEmpty(categoriasParams.Nome)) {

                categorias = categorias.Where(c => c.Nome.Contains(categoriasParams.Nome));
            }

            var categoriasFiltradads = await categorias.ToPagedListAsync(categoriasParams.PageNumber, categoriasParams.PageSize);

            return categoriasFiltradads;
        }
    }
}

