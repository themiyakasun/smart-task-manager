using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Data.Config
{
    public class UserConfig: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id).UseIdentityColumn();
            builder.Property(u => u.Name).IsRequired().HasMaxLength(55);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(55);
            builder.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);
            builder.Property(u => u.RefreshToken).HasMaxLength(255);
            builder.Property(u => u.RefreshTokenExpiryTime).HasColumnType("datetime2").HasDefaultValue(null);
            builder.Property(u => u.CreatedAt).IsRequired().HasDefaultValueSql("GETUTCDATE()")
                .ValueGeneratedOnAdd();
        }
    }
}
