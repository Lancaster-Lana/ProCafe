using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using DAL.Entity;
using DAL.Mappings;

namespace DAL.DBModel
{
    public class AppDbContext : DbContext//<User, Role, int>
    {
        //public DbSet<UsersGroup> UsersGroup { get; set; }

        //public DbSet<UserToUsersGroup> UsersToUsersGroup { get; set; }

        //public DbSet<Currency> Currencies { get; set; }

        //public DbSet<Category> Categories { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Supplier> Suppliers { get; set; }

        public DbSet<Address> Address { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Special configuration for supplemantary table UsersToUsersGroup
            //modelBuilder.Entity<Product>().HasKey(x => x.ProductId);
            //modelBuilder.Entity<Payment>().HasKey(x => new { x.UserId, x.UsersGroupId });

            modelBuilder.ApplyConfiguration(new UserMapping());
            //modelBuilder.ApplyConfiguration(new UsersGroupMapping());
            //modelBuilder.ApplyConfiguration(new RoleMapping());
  
            //modelBuilder.ApplyConfiguration(new CurrencyMapping());
            modelBuilder.ApplyConfiguration(new ProductMapping());
            modelBuilder.ApplyConfiguration(new OrderMapping());
            modelBuilder.ApplyConfiguration(new PaymentMapping());
        }
    }

    
    //public class DBContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    //{
    //    public AppDbContext CreateDbContext(string[] args)
    //    {
    //        var identityConnectionStr = "Server=.;Database=Bakery;Trusted_Connection=True;MultipleActiveResultSets=true"; //args[0]; //"Server=.;Database=BakeryIdentityDB;Trusted_Connection=True;MultipleActiveResultSets=true";
    //        //Configuration.GetConnectionString("DefaultConnection")

    //        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
    //        optionsBuilder.UseSqlServer(identityConnectionStr);

    //        return new AppDbContext(optionsBuilder.Options);
    //    }
    //} 
}
