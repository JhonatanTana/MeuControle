using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;

namespace MeuControleAPI.Repositories {
    public class CategoriaRepository : Repository<Categoria>, ICategoriaRepository {

        public CategoriaRepository(AppDbContext context) : base(context) { }
    }
}

