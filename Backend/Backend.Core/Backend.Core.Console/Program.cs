using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Backend.Core.Utils.Http;
using Backend.Core.Dbaccess;

namespace Backend.Core.Console
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
                services.AddScoped<ApplicationDbUpdater>();

            }).Build();

            var fetcher = host.Services.GetRequiredService<Fetcher>();

            var fetchedResultsHandler = host.Services.GetRequiredService<FetchedResultsHandler>();
            var dbUpdater = host.Services.GetRequiredService<ApplicationDbUpdater>();

            try
            {
                System.Console.WriteLine("What would you like to do ?");
                System.Console.WriteLine("1. Update Database");
                System.Console.WriteLine("2. Perform the fetching and updating");
                System.Console.Write("Enter your choice: ");

                var userChoice = System.Console.ReadLine();
                switch (userChoice)
                {
                    case "1":
 
                        System.Console.WriteLine("Updating DB");
                        await dbUpdater.UpdateDatabaseAsync();
                        break;

                    case "2":
             
                        var products = await fetcher.FetchAll();
                        CancellationToken cancellationToken = new CancellationToken();
                        await fetchedResultsHandler.StoreFetchedProducts(products, cancellationToken);

                        System.Console.WriteLine("Fetching and updating completed successfully.");
                        break;

                    default:
                  
                        System.Console.WriteLine("Invalid choice. Please rerun and select either 1 or 2.");
                        break;
                }


            }
            catch (Exception ex)
            {
                System.Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
