using System;
using System.Collections.Generic;
using System.Text;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AvsarGame.Dal.Concreate.EntityFramework {
    public class AvsarGameDBcontext : IdentityDbContext<ApplicationUser, IdentityRole, string> {
        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<Campaign> Campaigns { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<IdentityRole> AppIdentityRoles { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Games> Games { get; set; }
        public virtual DbSet<UserOrder> UserOrder { get; set; }
        public virtual DbSet<UserOrderDetail> UserOrderDetail { get; set; }
        public virtual DbSet<Log> Log { get; set; }
        public virtual DbSet<UserBalance> UserBalance { get; set; }
        public virtual DbSet<UserBalanceDetail> UserBalanceDetails { get; set; }
        public virtual DbSet<UserPaymentRequest> UserPaymentRequests { get; set; }
        public virtual DbSet<UserNotification> UserNotifications { get; set; }

        public AvsarGameDBcontext(DbContextOptions<AvsarGameDBcontext> options) : base(options) {
        }

        public AvsarGameDBcontext() {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
                optionsBuilder.UseSqlServer(@"Server=.;database=AvsarGame;Trusted_Connection=True;MultipleActiveResultSets=true");
                //optionsBuilder.UseSqlServer(@"server=167.86.127.181\MSSQLSERVER2012;Initial Catalog=dthamita_;User ID=esatt;password=Esat2121**;");
            }
        }
    }
}