using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Mappings
{
    public class PaymentMapping : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.Property(x => x.CardNumber).IsRequired();

            //builder.HasOne(x => x.ShippingAddress)
                //.WithOne(y => y.Order).HasForeignKey(p => p.UsersGroupId)
            //    .OnDelete(DeleteBehavior.Cascade);//delete UsersGroup -> and related users

            builder.ToTable("Payments");
        }
    }
}