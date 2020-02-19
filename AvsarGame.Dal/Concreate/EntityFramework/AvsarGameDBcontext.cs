using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class AvsarGameDBcontext : IdentityDbContext<ApplicationUser, ApplicationRole, string> {
      
        public virtual DbSet<Announcement> Authors { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<ApplicationRole> AppIdentityRoles { get; set; }
        public virtual DbSet<IdentityRole> IdentityRoles { get; set; }

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
                optionsBuilder.UseSqlServer(@"Server=.;database=AvsarGame;Trusted_Connection=True;MultipleActiveResultSets=true");
                //optionsBuilder.UseSqlServer(@"server=167.86.127.181\MSSQLSERVER2012;Initial Catalog=dthamita_;User ID=esatt;password=Esat2121**;");
            }

        }
    }
}