using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Backend.Core.Models;
using Backend.Core.DTOs;
using Backend.Core.Dbaccess;
using System.Text.Json;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace Backend.Core.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ODataController
    {
        private readonly ApplicationDbContext _context;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductsController(ApplicationDbContext context, IProductRepository productRepository, IMapper mapper)
        {
            _context = context;
            _productRepository = productRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [EnableQuery(MaxTop = 50, PageSize = 30)]
        public IActionResult GetProducts()
        {
            var products = _productRepository.GetAll()
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductTags)
                .ThenInclude(pt => pt.Tag).ProjectTo<ProductDTO>(_mapper.ConfigurationProvider);


            return Ok(products);
        }

        [HttpGet("relations")]
        public async Task<IActionResult> GetProductRelations()
        {
            var categories = await _context.Categories.ToListAsync();
            var brands = await _context.Brands.ToListAsync();
            var tags = await _context.Tags.ToListAsync();

            var response = new
            {
                Categories = categories.Select(c => new { c.Id, c.Name }),
                Brands = brands.Select(b => new { b.Id, b.Name }),
                Tags = tags.Select(t => new { t.Id, t.Name })
            };

            return Ok(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var p = await _productRepository.GetAll().Include(p => p.Category)
            .Include(p => p.Brand)
            .Include(p => p.ProductTags)
            .ThenInclude(pt => pt.Tag).FirstOrDefaultAsync(p => p.Id == id);

            if (p == null)
                return NotFound();

            return new ProductDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Brand = p.Brand != null ? p.Brand.Name : "",
                Category = p.Category != null ? p.Category.Name : "",
                Price = p.Price,
                Rating = p.Rating,
                Thumbnail = p.Thumbnail,
                UpdatedAt = p.UpdatedAt,
                Tags = p.ProductTags.Select(pt => pt.Tag.Name).ToArray()

            };
        }



        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            await _productRepository.AddAsync(product);
            await _productRepository.SaveAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
                return BadRequest("Product ID from path and body do not match.");

            _productRepository.Update(product);

            try
            {
                await _productRepository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ProductExistsAsync(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            _productRepository.Delete(product);
            await _productRepository.SaveAsync();

            return NoContent();
        }

        private async Task<bool> ProductExistsAsync(int id)
        {
            var found = await _productRepository.GetByIdAsync(id);
            return found != null;
        }
    }
}
