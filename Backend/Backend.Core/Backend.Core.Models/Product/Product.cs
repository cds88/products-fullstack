namespace Backend.Core.Models
{
    public class Product
    {
        public int Id { get; set; }
        required public string Title { get; set; }

        public string Description { get; set; }= String.Empty;

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }


        public int? BrandId { get; set; }
        public Brand? Brand { get; set; } = null;

        public decimal Price { get; set; }

        public decimal Rating { get; set; }

        public string Thumbnail { get; set; } = String.Empty;

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