using Live.Backend.Models;
using Live.Backend.DTOs;
using Microsoft.EntityFrameworkCore;
using Live.Backend.Utils.Extensions;
using Live.Backend.Utils.Http;

using Live.Backend.Dbaccess;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Live.Backend.Services
{
    public class StartupRemoteAPIService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public StartupRemoteAPIService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        private Dictionary<string, TEntity> AddMissingEntities<TEntity>(
            List<string> distinctNames,
            IReadOnlyDictionary<string, TEntity> existingEntities,
            Func<string, TEntity> createEntity)
            where TEntity : class
        {
            return distinctNames
                .Where(name => !existingEntities.ContainsKey(name))
                .ToDictionary(name => name, createEntity);
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var fetcher = scope.ServiceProvider.GetRequiredService<Fetcher>();

            try
            {
                List<ProductDTO> productDTOs = await fetcher.FetchAll();

                var categoriesDistinct = productDTOs.Select(dto => dto.Category).Where(c => !string.IsNullOrWhiteSpace(c)).Distinct().ToList();
                var brandsDistinct = productDTOs.Where(c => !string.IsNullOrWhiteSpace(c.Brand)).Select(dto => dto.Brand).Distinct().ToList();
                var tagsDistinct = productDTOs.SelectMany(dto => dto.Tags.Select(t => t)).Where(c => !string.IsNullOrWhiteSpace(c)).Distinct().ToList();

                var existingCategories = await dbContext.Categories.Where(c => categoriesDistinct.Contains(c.Name)).ToDictionaryAsync(c => c.Name, cancellationToken);
                var existingBrands = await dbContext.Brands.Where(b => brandsDistinct.Contains(b.Name)).ToDictionaryAsync(c => c.Name, cancellationToken);
                var existingTags = await dbContext.Tags.Where(t => tagsDistinct.Contains(t.Name)).ToDictionaryAsync(t => t.Name, cancellationToken);


                var newCategories = AddMissingEntities(categoriesDistinct, existingCategories, name => new Category { Name = name });
                var newBrands = AddMissingEntities(brandsDistinct, existingBrands, name => new Brand { Name = name });
                var newTags = AddMissingEntities(tagsDistinct, existingTags, name => new Tag { Name = name });

                dbContext.Categories.AddRange(newCategories.Values);
                dbContext.Brands.AddRange(newBrands.Values);
                dbContext.Tags.AddRange(newTags.Values);

                existingCategories.UnionWith(newCategories);
                existingBrands.UnionWith(newBrands);
                existingTags.UnionWith(newTags);


                var productIds = productDTOs.Select(dto => dto.Id).ToList();
                var existingProducts = await dbContext.Products.Where(p => productIds.Contains(p.Id)).ToDictionaryAsync(p => p.Id, cancellationToken);

                var dtosToCreate = productDTOs.Where(dto => !existingProducts.ContainsKey(dto.Id));
                var dtosToUpdate = productDTOs.Where(dto => existingProducts.ContainsKey(dto.Id));


                List<Product> productsToCreate = new();
                foreach (var dto in dtosToCreate)
                {
                    var productTags = dto.Tags?
                           .Where(tag => !string.IsNullOrWhiteSpace(tag) && existingTags.TryGetValue(tag, out _))
                           .Distinct()
                           .Select(tag => new ProductTag
                           {
                               ProductId = dto.Id,
                               TagId = existingTags[tag].Id,
                               Tag = existingTags[tag]
                           }).ToList() ?? new List<ProductTag>();

                    var product = new Product
                    {
                        Id = dto.Id,
                        Brand = dto?.Brand != null && existingBrands.TryGetValue(dto.Brand, out var foundBrand) ? foundBrand : null,
                        Category = existingCategories[dto!.Category],
                        Description = dto.Description,
                        Price = dto.Price,
                        Rating = dto.Rating,
                        Thumbnail = dto.Thumbnail,
                        Title = dto.Title,
                        UpdatedAt = dto.UpdatedAt,
                        ProductTags = productTags
                    };
                    productsToCreate.Add(product);
                }


                dbContext.Products.AddRange(productsToCreate);

                foreach (var dto in dtosToUpdate)
                {

                    var existingProduct = existingProducts[dto.Id];

                    existingProduct.Brand = dto?.Brand != null && existingBrands.TryGetValue(dto.Brand, out var foundBrand) ? foundBrand : null;
                    existingProduct.Category = existingCategories[dto!.Category];
                    existingProduct.Description = dto.Description;
                    existingProduct.Price = dto.Price;
                    existingProduct.Rating = dto.Rating;
                    existingProduct.Thumbnail = dto.Thumbnail;
                    existingProduct.Title = dto.Title;
                    existingProduct.UpdatedAt = dto.UpdatedAt;
                }
                await dbContext.SaveChangesAsync(cancellationToken);

            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("An error occurred while fetching products: " + ex.Message);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }


}
