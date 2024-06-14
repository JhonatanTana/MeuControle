using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using X.PagedList;

namespace MeuControleAPI.Repositories {
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository {

        public CategoriaRepository(AppDbContext context) : base(context) { }
    }
}

