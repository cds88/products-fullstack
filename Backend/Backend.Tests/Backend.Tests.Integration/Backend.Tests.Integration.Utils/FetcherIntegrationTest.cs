using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.Core.Utils.Http;
using Backend.Core.DTOs;
using Backend.Core.Models;
using Xunit;

namespace Backend.Tests.Integration.Utils.Http
{
    public class FetcherIntegrationTest
    {
        private readonly HttpClient _httpClient;
        private readonly Fetcher _fetcher;

        // Sample API URL
        private readonly string _apiUrl = "https://dummyjson.com/products";

        public FetcherIntegrationTest()
        {
            _httpClient = new HttpClient();
            _fetcher = new Fetcher(new DefaultHttpClientFactory(_httpClient));  // Using real HttpClient for integration
        }

        // Helper method to mock a successful response
        private async Task<ApiResponse> GetApiResponseFromRealApi(string url)
        {
            var response = await _httpClient.GetAsync(url);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception("Failed to fetch data from API");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ApiResponse>(responseContent);
        }

        

        [Fact]
        public async Task FetchAll_ShouldReturnListOfProductDTOs_WhenDataIsFetchedSuccessfully()
        {
 
 
            var result = await _fetcher.FetchAll();

 
            Assert.NotNull(result);
            Assert.True(result.Count > 0, "The result should contain products.");
          //  Assert.Equal("Product 1", result[0].Title); 
            

           Assert.NotNull(result[0].Title);
            Assert.True(result[0].Price > 0);
            Assert.NotEqual(0, result[0].Id);            
        }

        [Fact]
        public async Task FetchAll_ShouldFetchMultiplePages_WhenMoreThan30ProductsExist()
        {
            // Arrange: fetch data from the API with pagination
            int totalProducts = 60; // For the test, we simulate more than 30 products

            var firstPageResponse = await GetApiResponseFromRealApi(_apiUrl + "?limit=30&skip=0");
            var secondPageResponse = await GetApiResponseFromRealApi(_apiUrl + "?limit=30&skip=30");

            // Act: Use the fetcher to process these responses
            var result = await _fetcher.FetchAll();

            // Assert: Ensure all products are fetched, across multiple pages
            Assert.NotNull(result);
            Assert.Equal(totalProducts, result.Count);
        }

        // [Fact]
        // public async Task FetchData_ShouldThrowException_WhenInvalidResponse()
        // {
        //     // Arrange: request invalid content
        //     _httpClient.DefaultRequestHeaders.Clear();
        //     _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        //     var invalidApiUrl = "https://dummyjson.com/invalidendpoint";

        //     // Act & Assert: Call the fetcher with an invalid response
        //     var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _fetcher.FetchData(0));
        //     Assert.Equal("Failed to deserialize response", exception.Message);
        // }
    }

    // A simple HttpClientFactory that returns a real HttpClient for integration tests
    public class DefaultHttpClientFactory : IHttpClientFactory
    {
        private readonly HttpClient _httpClient;

        public DefaultHttpClientFactory(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public HttpClient CreateClient(string name)
        {
            return _httpClient;
        }
    }
}
