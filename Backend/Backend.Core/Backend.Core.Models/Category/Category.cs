namespace Backend.Core.Models
{
    public class Category
    {
        public int Id { get; set; }

        required public string Name { get; set; }

        public DateTime CreatedAt { get; set; }

        public Category()
        {
            CreatedAt = DateTime.UtcNow;
        }

    }
}