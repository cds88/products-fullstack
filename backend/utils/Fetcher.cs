using System.Text.Json;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Utils
{
    internal class Fetcher
    {
        private readonly HttpClient httpClient;

        public Fetcher(IHttpClientFactory httpClientFactory)
        {
            httpClient = httpClientFactory.CreateClient();
        }

        public async Task<List<ProductDTO>> FetchAll()
        {
            List<ProductDTO> results = new();

            int skip = 0;

            var response = await FetchData(skip);

            results.AddRange(response.Products);

            while (results.Count < response.Total)
            {
                await Task.Delay(1000 + skip);
                skip += 30;
                response = await FetchData(skip);
                if (response.Products.Count == 0) break;
                results.AddRange(response.Products);
            }

            return results;
        }

        public async Task<ApiResponse> FetchData(int skip)
        {
            string url = $"https://dummyjson.com/products?limit=30&skip={skip}";

            using var responseStream = await httpClient.GetStreamAsync(url);
            var result = await JsonSerializer.DeserializeAsync<ApiResponse>(responseStream, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (result == null)
            {
                throw new InvalidOperationException("The request failed or response is not in expected format");
            }

            return result;

        }

    }
}