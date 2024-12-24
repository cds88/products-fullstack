using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Backend.Services
{
    public class ProductClassificatorService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public async Task RefreshCache()
        {
            await RefreshBrandsAsync();
            await RefreshCategoriesAsync();
        }
        public List<string> GetCategories()
        {
            return _memoryCache.Get<List<string>>("Categories") ?? new List<string>();
        }

        public List<string> GetBrands()
        {
            return _memoryCache.Get<List<string>>("Brands") ?? new List<string>();
        }

        public async Task RefreshCategoriesAsync()
        {
            var categories = await _dbContext.Products.Select(p => p.Category).Distinct().ToListAsync();
            _memoryCache.Set("Categories", categories);
        }
        public async Task RefreshBrandsAsync()
        {
            var brands = await _dbContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
            _memoryCache.Set("Brands", brands);
        }
    }
}