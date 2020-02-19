using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.Dal.Concreate.EntityFramework;
using AvsarGame.Entities.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            services.Configure< IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;//sayı zorunluluğu
                options.Password.RequireLowercase = true;//küçük harf
                options.Password.RequiredLength = 8;//minimum 8 karakter
                options.Password.RequireNonAlphanumeric = true;//alfanümerik olması
                options.Password.RequireUppercase = true;//büyük harf zorunluluğu

                options.Lockout.MaxFailedAccessAttempts = 5;//max hatalı giriş sayısı
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);//kullanıcı ne kadar süre boyunca sisteme giriş yapamasın
                options.User.RequireUniqueEmail = true;
            });

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
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "AvsarGameAPI V1"); });
        }
    }
}