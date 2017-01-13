using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<DecimalPropertyConvention>();
            modelBuilder.Conventions.Add(new DecimalPropertyConvention(14,2));
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Member> Members { get; set; }
        public DbSet<Festival> Festival { get; set; }
        public DbSet<Models.Service> Services { get; set; }
        public DbSet<PerformedService> PerformedServices { get; set; }
    }
}
