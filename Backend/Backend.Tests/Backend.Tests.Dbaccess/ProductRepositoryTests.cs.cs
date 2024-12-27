using Xunit;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Backend.Core.Dbaccess;
using Backend.Core.Models;



namespace Backend.Tests.DbAccess
{
    public class ProductRepositoryTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;
            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task AddProduct_ShouldReturnAddedProduct()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var repository = new ProductRepository(context);
            var newProduct = new Product { Title = "Test Product", Price = 10 };

            // Act
            // Act
            await repository.AddAsync(newProduct);  // No need to assign it to a variable
            await repository.SaveAsync();  // Explicitly call SaveAsync to persist the changes
            // Assert: Ensure that the product is in the database
            var addedProduct = await context.Products.FirstOrDefaultAsync(p => p.Title == "Test Product");
            Assert.NotNull(addedProduct);  // Ensure the product is added
            Assert.Equal("Test Product", addedProduct.Title);  // Ensure the name matches
            Assert.Equal(10, addedProduct.Price); // Assert that the product's price matches
        }
    }
}
