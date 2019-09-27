namespace DAL.Mappings
{
    using DAL.Entity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.UserName).IsRequired();
            builder.Property(x => x.PasswordHash);
            builder.Property(x => x.Email);
            //builder.HasMany(x => x.UsersGroups);//.WithOne(v=>v.Users);
            builder.ToTable("Users");
        }
    }
}