using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Core.Dbaccess
{
    public static class DbContextConfiguration
    {
        private static string GetConnectionString()
        {
            string POSTGRES_HOST = Environment.GetEnvironmentVariable("POSTGRES_HOST");
            string POSTGRES_DB = Environment.GetEnvironmentVariable("POSTGRES_DB");
            string POSTGRES_USER = Environment.GetEnvironmentVariable("POSTGRES_USER");
            string POSTGRES_PASSWORD = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");

            var connectionString = $"Host={POSTGRES_HOST};Database={POSTGRES_DB};Username={POSTGRES_USER};Password={POSTGRES_PASSWORD}";
            return connectionString;

        }
        public static void AddConfiguredDbContext(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(GetConnectionString())
                       .UseSnakeCaseNamingConvention();
            });
        }
    }

}
