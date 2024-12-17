using Live.Models;
using System.Text.Json;

public class ProductLoaderHostedService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public ProductLoaderHostedService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var httpClientFactory = scope.ServiceProvider.GetRequiredService<IHttpClientFactory>();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        int limit = 30;                  
        while (limit < 300) 
        {
            var client = httpClientFactory.CreateClient();
            var response = await client.GetAsync("https://dummyjson.com/products");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
     
            var productsResponse = JsonSerializer.Deserialize<ApiResponseModel>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            Console.WriteLine("----qwe");
            Console.WriteLine(JsonSerializer.Serialize(productsResponse));

            // dbContext.Products.AddRange(productsResponse.Products);
            // await dbContext.SaveChangesAsync();

            limit += 30;
            break;
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
