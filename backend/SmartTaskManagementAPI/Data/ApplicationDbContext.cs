using Microsoft.EntityFrameworkCore;
using SmartTaskManagementAPI.Models;

namespace SmartTaskManagementAPI.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
        }

        public DbSet<User> Users { get; set; }

    }
}
