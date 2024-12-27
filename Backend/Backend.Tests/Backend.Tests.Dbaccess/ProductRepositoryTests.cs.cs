using Xunit;
using Backend.Core.Dbaccess;
using Backend.Core.Models;
using System.Threading.Tasks;

namespace Backend.Tests.DbAccess
{
    public class ProductRepositoryTests
    {
        [Fact]
        public async Task AddProduct_ShouldReturnAddedProduct()
        {
            // Arrange
            var repository = new ProductRepository();
            var newProduct = new Product { Name = "Test Product", Price = 10 };

            // Act
            var result = await repository.AddProductAsync(newProduct);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Product", result.Name);
        }
    }
}
