using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Data.Config
{
    public class TaskConfig: IEntityTypeConfiguration<UserTask>
    {
        public void Configure(EntityTypeBuilder<UserTask> builder)
        {
            builder.ToTable("Tasks");
            builder.HasKey(t => t.Id);

            builder.Property(t => t.Id).UseIdentityColumn();
            builder.Property(t => t.Title).IsRequired().HasMaxLength(100);
            builder.Property(t => t.Description).IsRequired().HasMaxLength(500);
            builder.Property(t => t.Status)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(20)
                .HasDefaultValue(UserTaskStatus.Pending);
            builder.Property(t => t.CreatedAt).IsRequired().HasDefaultValueSql("GETUTCDATE()")
                .ValueGeneratedOnAdd();
            builder.HasOne(u => u.UserDetails)
                .WithMany(t => t.Tasks)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Tasks_Users");
        }
    }
}
