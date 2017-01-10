using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Temple.Service.Database.Models;

namespace Temple.Service.Database
{
    public class TempleDatabaseContext : DbContext, ITempleDatabaseContext
    {
        public TempleDatabaseContext()
            : base("templeDbConnectionString")
        {

        }

        public DbSet<Member> Members { get; set; }
    }
}
