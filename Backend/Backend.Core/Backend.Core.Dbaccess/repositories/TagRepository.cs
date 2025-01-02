using Backend.Core.Models;

namespace Backend.Core.Dbaccess
{
    public class TagRepository : AbstractRepository<Tag>, ITagRepository
    {
        public TagRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
