﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AvsarGame.Dal.Abstract;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace AvsarGame.API {
    public class Startup {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment env) {
            Configuration = configuration;

            var builder = new ConfigurationBuilder()
                          .SetBasePath(env.ContentRootPath)
                          .AddEnvironmentVariables()
                          .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services) {
            services.AddDbContext<AvsarGameDBcontext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<AvsarGameDBcontext>()
                    .AddDefaultTokenProviders();
            services.AddAutoMapper();
            services.AddTransient<ICategory, EfCategory>();
            services.AddTransient<IGame, EfGame>();
            services.AddTransient<IAnnouncement, EfAnnouncement>();
            services.AddTransient<IUserOrderDetail, EfUserOrderDetail>();
            services.AddTransient<IUserOrder, EfUserOrder>();
            services.AddTransient<ILog, EfLog>();
            services.AddTransient<IUserPaymentRequest, EfIUserPaymentRequest>();
            services.AddTransient<IUserBalance, EfUserBalance>();
            services.AddTransient<IUserBalanceDetails, EfUserBalanceDetails>();
            services.AddTransient<IUserNotification, EfUserNotification>();
            services.AddTransient<IUserSell, EfUserSell>();
            services.AddTransient<IUserSellDetail, EfUserSellDetail>();
            services.AddTransient<IKnightCyberRing,EfKnightCyberRing>();
            services.AddTransient<IKnightItem,EfKnightItem>();
            services.AddTransient<IImageMaster, EfImageMaster>();
            services.AddTransient<IImageDetail, EfImageDetail>();
            services.AddTransient<IUserComment, EfUserComment>();
            services.AddTransient<IComment, EfComment>();
            services.AddTransient<ISubComment, EfSubComment>();
            services.AddTransient<IMetin2, EfMetin2>();
            services.AddTransient<IPaymentLog, EfPaymentLog>();
            services.AddTransient<IKnightCommerceDetail, EfKnightCommerceDetail>();
            services.AddTransient<IUserDrawableMoney, EfUserDrawableMoney>();
            services.AddTransient<IUserMoneyDrawRequest, EfUserMoneyDrawRequest>();

            services.Configure<IdentityOptions>(options => {
                options.Password.RequireDigit = false; //sayı zorunluluğu
                options.Password.RequireLowercase = false; //küçük harf
                options.Password.RequiredLength = 6; //minimum 8 karakter
                options.Password.RequireNonAlphanumeric = false; //alfanümerik olması
                options.Password.RequireUppercase = false; //büyük harf zorunluluğu
                options.Lockout.MaxFailedAccessAttempts = 5; //max hatalı giriş sayısı
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15); //kullanıcı ne kadar süre boyunca sisteme giriş yapamasın
                options.User.RequireUniqueEmail = true;
            });

            services.AddAuthentication(x => {
                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(x => {
                        x.RequireHttpsMetadata = false;
                        x.SaveToken = true;
                        x.TokenValidationParameters = new TokenValidationParameters {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                                ValidateIssuer = false,
                                ValidateAudience = false
                        };
                    });
            services.AddMemoryCache();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info { Title = "AvsarGameAPI", Version = "v1" }); });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseDeveloperExceptionPage();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());

            app.UseMvc(routes => {
                routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action}/{id?}");
            });
            app.UseDeveloperExceptionPage();
            app.UseHttpsRedirection();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "AvsarGameAPI V1"); });
            app.UseMvc();
        }
    }
}