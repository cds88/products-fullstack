namespace Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }


        public int? BrandId { get; set; }
        public Brand? Brand { get; set; } = null;

        public decimal Price { get; set; }

        public decimal Rating { get; set; }

        public string Thumbnail { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<ProductTag> ProductTags { get; set; } = new List<ProductTag>();
    }

    public class ProductTag
    {
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int TagId { get; set; }
        public Tag Tag { get; set; } = null!;
    }
}