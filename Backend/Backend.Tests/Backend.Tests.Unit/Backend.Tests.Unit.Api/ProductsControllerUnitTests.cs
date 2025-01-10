using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Core.Api;
using Backend.Core.Dbaccess;
using Backend.Core.Models;
using Backend.Core.DTOs;
using AutoMapper;

namespace Backend.Tests.Unit.Api
{
    public class ProductsControllerUnitTest : IDisposable
    {
        private readonly ProductsController _controller;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductsControllerUnitTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("TestDatabase")
                .Options;

            _context = new ApplicationDbContext(options);
            SeedTestData();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Product, ProductDTO>()
                    .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Brand != null ? src.Brand.Name : ""))
                    .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : ""))
                    .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.ProductTags.Select(pt => pt.Tag.Name).ToArray()));
            });
            _mapper = config.CreateMapper();
            _controller = new ProductsController(_context, new ProductRepository(_context), _mapper);
        }

        private void SeedTestData()
        {
            var productList = new List<Product>
            {
                new Product { Title = "Product 1", Price = 100 },
                new Product { Title = "Product 2", Price = 150 }
            };

            _context.Products.AddRange(productList);
            _context.SaveChanges();
        }

        [Fact]
        public void GetProducts_ReturnsOkResult()
        {
            var result = _controller.GetProducts();
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, actionResult.StatusCode);
        }

        [Fact]
        public async Task GetProduct_ReturnsProduct()
        {

            var result = await _controller.GetProduct(1);

            var actionResult = Assert.IsType<ActionResult<ProductDTO>>(result);
            var productResult = Assert.IsType<ProductDTO>(actionResult.Value);

            Assert.Equal(1, productResult.Id);
            Assert.Equal("Product 1", productResult.Title);
        }

        [Fact]
        public void GetProducts_ReturnsEmptyList_WhenNoProductsExist()
        {
            _context.Products.RemoveRange(_context.Products);
            _context.SaveChanges();


            var result = _controller.GetProducts();


            var actionResult = Assert.IsType<OkObjectResult>(result);


            var productsQuery = actionResult.Value as IQueryable<ProductDTO>;


            Assert.IsAssignableFrom<IQueryable<ProductDTO>>(productsQuery);


            Assert.NotNull(productsQuery);
            Assert.Empty(productsQuery);
        }

        [Fact]
        public async Task GetProduct_ReturnsNotFound_WhenProductDoesNotExist()
        {

            var result = await _controller.GetProduct(999);


            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostProduct_CreatesProductAndReturnsCreatedResult()
        {

            var newProduct = new Product { Title = "New Product", Price = 200 };


            var result = await _controller.PostProduct(newProduct);


            var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var createdProduct = Assert.IsType<Product>(actionResult.Value);
            Assert.Equal("New Product", createdProduct.Title);
            Assert.Equal(200, createdProduct.Price);
        }

        [Fact]
        public async Task PutProduct_UpdatesProductAndReturnsNoContent()
        {

            var existingProduct = _context.Products.First();
            existingProduct.Title = "Updated Product";
            existingProduct.Price = 250;


            var result = await _controller.PutProduct(existingProduct.Id, existingProduct);


            Assert.IsType<NoContentResult>(result);


            var updatedProduct = await _context.Products.FindAsync(existingProduct.Id);
            Assert.NotNull(updatedProduct);
            Assert.Equal("Updated Product", updatedProduct.Title);
            Assert.Equal(250, updatedProduct.Price);
        }

        [Fact]
        public async Task DeleteProduct_DeletesProductAndReturnsNoContent()
        {

            var productToDelete = new Product { Title = "Product to Delete", Price = 100 };
            _context.Products.Add(productToDelete);
            await _context.SaveChangesAsync();


            var result = await _controller.DeleteProduct(productToDelete.Id);


            Assert.IsType<NoContentResult>(result);


            var deletedProduct = await _context.Products.FindAsync(productToDelete.Id);
            Assert.Null(deletedProduct);
        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();

        }
    }


}
