using ecomm_project.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ecomm_project.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Seller> sellers { get; set; }
    public DbSet<User> users { get; set; }
    public DbSet<Product> products { get; set; }
    public DbSet<Order> orders { get; set; }
    public DbSet<Cart> cart { get; set; }
  }
}
