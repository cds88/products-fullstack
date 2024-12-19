using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ODataController
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [EnableQuery(MaxTop = 50, PageSize = 30)]
        public IQueryable<ProductDTO> GetProducts()
        {
            return _context.Products
            .Include(p => p.Category)
            .Include(p => p.Brand)
            .Include(p => p.ProductTags)
            .ThenInclude(pt => pt.Tag)
            .Select(p => new ProductDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Brand = p.Brand.Name,
                Category = p.Category.Name,
                Price = p.Price,
                Rating = p.Rating,
                Thumbnail = p.Thumbnail,
                UpdatedAt = p.UpdatedAt,
                Tags = p.ProductTags.Select(pt => pt.Tag.Name).ToArray()

            });

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var p = await _context.Products.Include(p => p.Category)
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
                Brand = p.Brand.Name,
                Category = p.Category.Name,
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
            _context.Products.Add(product);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
                return BadRequest("Product ID from path and body do not match.");

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
