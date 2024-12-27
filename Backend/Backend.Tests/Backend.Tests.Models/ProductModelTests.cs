using Xunit;
using Backend.Core.Models;

namespace Backend.Tests.Models
{
    public class ProductModelTests
    {
        [Fact]
        public void Product_SetValidName_ShouldBeValid()
        {
            // Arrange
            var product = new Product { Name = "Valid Product" };

            // Act & Assert
            Assert.Equal("Valid Product", product.Name);
        }

        [Fact]
        public void Product_SetInvalidName_ShouldThrowException()
        {
            // Arrange
            var product = new Product();

            // Act & Assert
            Assert.Throws<System.ArgumentException>(() => product.Name = "");
        }
    }
}
