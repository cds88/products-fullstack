using Backend.Core.Models;

namespace Backend.Core.Dbaccess
{
    public class BrandRepository : AbstractRepository<Brand>, IBrandRepository
    {
        public BrandRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
