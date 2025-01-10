using Xunit;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Backend.Core.Dbaccess;
using Backend.Core.Models;



namespace Backend.Tests.Unit.DbAccess
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
            
            var context = GetInMemoryDbContext();
            var repository = new ProductRepository(context);
            var newProduct = new Product { Title = "Test Product", Price = 10 };

            
            
            await repository.AddAsync(newProduct);  
            await repository.SaveAsync();  
            
            var addedProduct = await context.Products.FirstOrDefaultAsync(p => p.Title == "Test Product");
            Assert.NotNull(addedProduct);  
            Assert.Equal("Test Product", addedProduct.Title);  
            Assert.Equal(10, addedProduct.Price); 
        }
    }
}
