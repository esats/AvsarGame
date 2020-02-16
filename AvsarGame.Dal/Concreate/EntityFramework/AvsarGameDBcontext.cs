using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class AvsarGameDBcontext : DbContext {
        
        public AvsarGameDBcontext(DbContextOptions<AvsarGameDBcontext> options) : base(options)
        {
        }

        public AvsarGameDBcontext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=.;database=DentistApp;Trusted_Connection=True;MultipleActiveResultSets=true");
                //optionsBuilder.UseSqlServer(@"server=167.86.127.181\MSSQLSERVER2012;Initial Catalog=dthamita_;User ID=esatt;password=Esat2121**;");
            }

        }
    }
}