using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Temple.Service.Database.Models;

namespace Temple.Service.Database
{
    public interface ITempleDatabaseContext
    {
        DbSet<Member> Members { get; set; }
        DbSet<Festival> Festival { get; set; }
        DbSet<Database.Models.Service> Services { get; set; }
        DbSet<PerformedService> PerformedServices { get; set; }
        Task<int> SaveChangesAsync();
    }
}
