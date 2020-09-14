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
        public virtual DbSet<UserSell> UserSell { get; set; }
        public virtual DbSet<UserSellDetail> UserSellDetail { get; set; }
        public virtual DbSet<KnightCyberRing> KnightCyberRing { get; set; }
        public virtual DbSet<KnightItem> KnightItem { get; set; }
        public virtual DbSet<ImageMaster> ImageMaster { get; set; }
        public virtual DbSet<ImagesDetail> ImagesDetail { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<UserComment> UserComment { get; set; }
        public virtual DbSet<Metin2Item> Metin2Item { get; set; }
        public virtual DbSet<PaymentLog> PaymentLog { get; set; }

        public AvsarGameDBcontext(DbContextOptions<AvsarGameDBcontext> options) : base(options) {
        }

        public AvsarGameDBcontext() {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if (!optionsBuilder.IsConfigured) {
            #if DEBUG
                   optionsBuilder.UseSqlServer(@"Server=SAVAS-US\SQLEXPRESS;database=AvsarGame;Trusted_Connection=True;MultipleActiveResultSets=true");
            #else
                    optionsBuilder.UseSqlServer(@"server=mssql04.turhost.com;Initial Catalog=anatol20_anatoliagame;User ID=esat;password=Coie078");
            #endif
            }
        }
    }
}