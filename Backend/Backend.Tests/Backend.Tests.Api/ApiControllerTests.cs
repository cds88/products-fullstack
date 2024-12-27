using Xunit;
using Backend.Core.Api.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests.Api
{
    public class ApiControllerTests
    {
        [Fact]
        public void GetProducts_ReturnsOkResult()
        {
            // Arrange
            var controller = new ProductsController();

            // Act
            var result = controller.GetProducts();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, actionResult.StatusCode);
        }
    }
}
