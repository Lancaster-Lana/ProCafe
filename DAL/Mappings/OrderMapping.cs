using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Mappings
{
    public class OrderMapping : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(x => x.Name).IsRequired();

            builder.HasOne(x => x.Address)
            .WithMany() //one address can be used for several orders !
            .HasForeignKey(p => p.AddressId)
            .OnDelete(DeleteBehavior.Cascade);//delete UsersGroup -> and related users

            builder.HasMany(x => x.SelectedProducts)
            .WithOne(y => y.Order).HasForeignKey(p => p.OrderId)
            .OnDelete(DeleteBehavior.Cascade);//delete UsersGroup -> and related users

            builder.ToTable("Orders");
        }
    }
}