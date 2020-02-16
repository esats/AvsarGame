using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace AvsarGame.Portal
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services) {
            services.AddSession(options => {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
           
            app.UseSession();
            app.UseMvc(routes => {
                routes.MapRoute(
                        name: "default",
                        defaults: "{controller=Home}/{action=Index}",
                        template: "{controller=Home}/{action=Index}/{id?}");
            
            });
            app.UseStaticFiles();
        }
    }
}
