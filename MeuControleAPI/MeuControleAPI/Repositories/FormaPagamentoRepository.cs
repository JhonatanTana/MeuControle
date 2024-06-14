using MeuControleAPI.Context;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;

namespace MeuControleAPI.Repositories {
    public class FormaPagamentoRepository : Repository<FormaPagamento>, IFormaPagamentoRepository {

        private readonly AppDbContext _context;
        public FormaPagamentoRepository(AppDbContext context) : base(context) { }
    }
}
