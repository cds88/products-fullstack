using Backend.Core.Models;

namespace Backend.Core.Dbaccess
{
    public class ProductRepository : AbstractRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }


    }
}
