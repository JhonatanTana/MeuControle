using MeuControleAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MeuControleAPI.Context {
    public class AppDbContext : IdentityDbContext<ApplicationUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        }
        public DbSet<Categoria>? Categorias { get; set; }
        public DbSet<Produto>? Produtos { get; set; }
        public DbSet<Pedido>? Pedido { get; set; }
        public DbSet<ProdutosPedido>? ProdutosPedido { get; set; }
        public DbSet<FormaPagamento>? FormaPagamento { get; set; }
    }
}
