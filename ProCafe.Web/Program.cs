using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DAL.DBModel;

namespace MagicCafe.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            //Seed DB (NOTE: if DB is Microsoft.EntityFrameworkCore.DbContext, not System.Data.Entity.DbContext) 
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFact = services.GetRequiredService<ILoggerFactory>();

                try
                {
                    var dataContext = services.GetRequiredService<AppDbContext>();
                    //var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
                    //var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                    Seeder.SeedAsync(dataContext, loggerFact, 10);//, userManager, roleManager);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    //loggerFact.CreateLogger<Program>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
