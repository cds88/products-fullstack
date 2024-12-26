
namespace Live.Backend.Controllers
{
    public class PaginatedResponse<T>
    {
        public int TotalCount { get; set; }
        public IEnumerable<T> Items { get; set; }

        public PaginatedResponse(int totalCount, IEnumerable<T> items)
        {
            TotalCount = totalCount;
            Items = items;
        }
    }

}
