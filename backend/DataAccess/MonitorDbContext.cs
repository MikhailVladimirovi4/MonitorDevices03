using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess
{
    public class MonitorDbContext(DbContextOptions<MonitorDbContext> options) : DbContext(options)
    {
        public DbSet<Device> Devices => Set<Device>(); 
    }
}
