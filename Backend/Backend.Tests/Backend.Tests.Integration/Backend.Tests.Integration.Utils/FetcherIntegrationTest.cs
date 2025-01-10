using System.Net;
using System.Text.Json;
using Backend.Core.Utils.Http;
using Backend.Core.Models;
using Moq;
using Moq.Protected;

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
            _fetcher = new Fetcher(new DefaultHttpClientFactory(_httpClient));
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

            return JsonSerializer.Deserialize<ApiResponse>(responseContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            })!;

        }

        [Fact]
        public async Task FetchAll_ShouldReturnListOfProductDTOs_WhenDataIsFetchedSuccessfully()
        {


            var result = await _fetcher.FetchAll();


            Assert.NotNull(result);
            Assert.True(result.Count > 0, "The result should contain products.");



            Assert.NotNull(result[0].Title);
            Assert.True(result[0].Price > 0);
            Assert.NotEqual(0, result[0].Id);
        }
        [Fact]
        public async Task FetchAll_ShouldFetchMultiplePages_WhenMoreThan30ProductsExist()
        {
            var initialResponse = await GetApiResponseFromRealApi(_apiUrl + "?limit=30&skip=0");
            int totalProducts = initialResponse.Total; // Assume the API provides a "total" field

            var result = await _fetcher.FetchAll();


            Assert.NotNull(result);
            Assert.Equal(totalProducts, result.Count);
        }

        [Fact]
        public async Task FetchData_ShouldThrowException_WhenInvalidResponse()
        {
            var handlerMock = new Mock<HttpMessageHandler>(MockBehavior.Strict);
            handlerMock
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ThrowsAsync(new HttpRequestException("Network error"));

            var httpClient = new HttpClient(handlerMock.Object);
            var fetcher = new Fetcher(new DefaultHttpClientFactory(httpClient));

            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => fetcher.FetchData(0));
            Assert.Equal("Failed to fetch data from the API", exception.Message);
        }
    }

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
