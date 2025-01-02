using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Backend.Core.Models;
using Backend.Core.Dbaccess;

namespace Backend.Core.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ODataController
    {
        private readonly IBrandRepository _brandRepository;

        public BrandsController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        [EnableQuery(MaxTop = 50, PageSize = 30)]
        public IActionResult GetBrands()
        {
            var brands = _brandRepository.GetAll();
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand == null)
                return NotFound();

            return brand;
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand(Brand brand)
        {
            await _brandRepository.AddAsync(brand);
            await _brandRepository.SaveAsync();

            return CreatedAtAction(nameof(GetBrand), new { id = brand.Id }, brand);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand(int id, Brand brand)
        {
            if (id != brand.Id)
                return BadRequest("Brand ID from path and body do not match.");

            _brandRepository.Update(brand);

            try
            {
                await _brandRepository.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BrandExistsAsync(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand == null)
                return NotFound();

            _brandRepository.Delete(brand);
            await _brandRepository.SaveAsync();

            return NoContent();
        }

        private async Task<bool> BrandExistsAsync(int id)
        {
            var found = await _brandRepository.GetByIdAsync(id);
            return found != null;
        }
    }
}
