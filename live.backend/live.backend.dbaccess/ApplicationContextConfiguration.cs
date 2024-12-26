using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Live.Backend.Dbaccess
{
    public static class DbContextConfiguration
    {
        public static void AddConfiguredDbContext(this IServiceCollection services )
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql("Host=postgres;Database=live;Username=postgres;Password=postgres")
                       .UseSnakeCaseNamingConvention();
            });
        }
    }

}
