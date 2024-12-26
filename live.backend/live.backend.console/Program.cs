using Microsoft.Extensions.DependencyInjection;
using Live.Backend.Utils.Http;
using Live.Backend.Dbaccess;
using Microsoft.Extensions.Hosting;

namespace Live.Backend.ConsoleApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {


            var host = Host.CreateDefaultBuilder(args).ConfigureServices((context, services) =>
            {
                services.AddHttpClient();
                services.AddConfiguredDbContext();
                services.AddScoped<Fetcher>();
                services.AddScoped<FetchedResultsHandler>();

            }).Build();


            var fetcher = host.Services.GetRequiredService<Fetcher>();


            var fetchedResultsHandler = host.Services.GetRequiredService<FetchedResultsHandler>();

            try
            {

                var products = await fetcher.FetchAll();
                CancellationToken cancellationToken = new CancellationToken();
                await fetchedResultsHandler.StoreFetchedProducts(products, cancellationToken);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
