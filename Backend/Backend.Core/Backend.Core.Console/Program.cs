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

            var command = ConsoleExtensions.ParseArgs(args);
            if (command == null)
            {
                ShowHelp();
                return;
            }

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


                switch (command)
                {
                    case ConsoleExtensions.CommandLineArgs.UpdateDb:

                        System.Console.WriteLine("Updating DB");
                        await dbUpdater.UpdateDatabaseAsync();
                        break;

                    case ConsoleExtensions.CommandLineArgs.FetchUpdate:

                        var products = await fetcher.FetchAll();
                        CancellationToken cancellationToken = new CancellationToken();
                        await fetchedResultsHandler.StoreFetchedProducts(products, cancellationToken);

                        System.Console.WriteLine("Fetching and updating completed successfully.");
                        break;

                    default:
                        ShowHelp();
                        break;
                }


            }
            catch (Exception ex)
            {
                System.Console.WriteLine($"Error: {ex.Message}");
            }
        }
        private static void ShowHelp()
        {
            System.Console.WriteLine("Usage:");
            System.Console.WriteLine("  --update-db    Update the database.");
            System.Console.WriteLine("  --fetch        Fetch data and update the database.");
            System.Console.WriteLine("  --help, -h     Show this help message.");
        }
    }
}
