using Moq;
using Moq.Protected;
using Xunit;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.Core.Utils.Http;
using Backend.Core.DTOs;
using Backend.Core.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Xunit.Abstractions;

namespace Backend.Tests.Unit.Utils.Http
{
    public class FetcherTests
    {
        private readonly Mock<IHttpClientFactory> _httpClientFactoryMock;
        private readonly Mock<HttpMessageHandler> _httpMessageHandlerMock;

        private readonly ITestOutputHelper _output;

        private readonly Fetcher _fetcher;

        private readonly CategoryDTO _mockedCategoryDTO1 = new()
        {
            Name = "Mocked Category DTO 1",
        };
        private readonly CategoryDTO _mockedCategoryDTO2 = new()
        {
            Name = "Mocked Category DTO 2"
        };
        private readonly BrandDTO _mockedBrandDTO1 = new()
        {
            Name = "Mocked Brand DTO 1",
        };
        private readonly BrandDTO _mockedBrandDTO2 = new()
        {
            Name = "Mocked Brand DTO 2"
        };

        public FetcherTests(ITestOutputHelper output)
        {
            _httpMessageHandlerMock = new Mock<HttpMessageHandler>(MockBehavior.Strict);
            var httpClient = new HttpClient(_httpMessageHandlerMock.Object);
            _httpClientFactoryMock = new Mock<IHttpClientFactory>();
            _httpClientFactoryMock.Setup(factory => factory.CreateClient(It.IsAny<string>())).Returns(httpClient);
            _fetcher = new Fetcher(_httpClientFactoryMock.Object);
            _output = output;
        }

        private void SetupMockHttpMessageHandler(string content, HttpStatusCode statusCode)
        {
            _httpMessageHandlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = statusCode,
                    Content = new StringContent(content)
                });
        }

        [Fact]
        public async Task FetchData_Success_ReturnsApiResponse()
        {
            var expectedResponse = new ApiResponse
            {
                Products = new List<ProductDTO> { new ProductDTO { Id = 1, Title = "Test Product", Category = _mockedCategoryDTO1.Name } },
                Total = 1
            };
            var jsonResponse = JsonSerializer.Serialize(expectedResponse);

            SetupMockHttpMessageHandler(jsonResponse, HttpStatusCode.OK);

            var result = await _fetcher.FetchData(0);

            Assert.NotNull(result);
            Assert.Single(result.Products);
            Assert.Equal(1, result.Total);
            Assert.Equal("Test Product", result.Products[0].Title);
        }

        [Fact]
        public async Task FetchAll_ShouldReturnListOfProductDTOs_WhenDataIsFetchedSuccessfully()
        {
            var apiResponse = new ApiResponse
            {
                Products = new List<ProductDTO>
                {
                    new ProductDTO { Id = 1, Title = "Product 1", Price = 100, Category = _mockedCategoryDTO1.Name },
                    new ProductDTO { Id = 2, Title = "Product 2", Price = 200, Category = _mockedCategoryDTO2.Name }
                },
                Total = 2
            };
            var jsonResponse = JsonSerializer.Serialize(apiResponse);
            SetupMockHttpMessageHandler(jsonResponse, HttpStatusCode.OK);

            Assert.Equal(1, 1);

            var result = await _fetcher.FetchAll();

            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("Product 1", result[0].Title);
            Assert.Equal(100, result[0].Price);
            Assert.Equal("Product 2", result[1].Title);
            Assert.Equal(200, result[1].Price);
        }

        [Fact]
        public async Task FetchAll_ShouldReturnEmptyList_WhenNoProductsAreFetched()
        {

            var apiResponse = new ApiResponse
            {
                Products = new List<ProductDTO>(),
                Total = 0
            };
            var jsonResponse = JsonSerializer.Serialize(apiResponse);

            SetupMockHttpMessageHandler(jsonResponse, HttpStatusCode.OK);


            var result = await _fetcher.FetchAll();


            Assert.NotNull(result);
            Assert.Empty(result);
        }
        [Fact]
        public async Task FetchAll_ShouldFetchMultiplePages_WhenMoreThan30ProductsExist()
        {

            var firstPageResponse = new ApiResponse
            {
                Products = new List<ProductDTO>
                {
                    new ProductDTO { Id = 1, Title = "Product 1", Price = 100, Category = _mockedCategoryDTO1.Name },
                    new ProductDTO { Id = 2, Title = "Product 2", Price = 200, Category = _mockedCategoryDTO2.Name }
                },
                Total = 4
            };

            var secondPageResponse = new ApiResponse
            {
                Products = new List<ProductDTO>
                {
                    new ProductDTO { Id = 3, Title = "Product 3", Price = 300, Category = _mockedCategoryDTO1.Name },
                    new ProductDTO { Id = 4, Title = "Product 4", Price = 400, Category = _mockedCategoryDTO2.Name }
                },
                Total = 4
            };

            var firstPageJson = JsonSerializer.Serialize(firstPageResponse);
            var secondPageJson = JsonSerializer.Serialize(secondPageResponse);


            _httpMessageHandlerMock
                .Protected()
                .SetupSequence<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<System.Threading.CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Content = new StringContent(firstPageJson)
                })
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Content = new StringContent(secondPageJson)
                });

            var result = await _fetcher.FetchAll();

            Assert.NotNull(result);
            Assert.Equal(4, result.Count);
            Assert.Equal("Product 1", result[0].Title);
            Assert.Equal("Product 3", result[2].Title);
        }


        [Fact]
        public async Task FetchData_ShouldThrowException_WhenInvalidResponse()
        {
            _httpMessageHandlerMock
               .Protected()
               .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<System.Threading.CancellationToken>())
               .ReturnsAsync(new HttpResponseMessage
               {
                   StatusCode = System.Net.HttpStatusCode.OK,
                   Content = new StringContent("Invalid Response")
               });

            var exception = await Assert.ThrowsAsync<InvalidOperationException>(() => _fetcher.FetchData(0));
            Assert.Equal("Failed to deserialize response", exception.Message);
        }


    }
}
