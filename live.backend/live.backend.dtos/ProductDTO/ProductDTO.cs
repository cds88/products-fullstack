

namespace Live.Backend.DTOs
{
        public class ProductDTO  
    {
        public int Id {get;set;}
        public string Title {get;set;}
        public string Description {get;set;}
        public string Category {get;set;}
        public string Brand {get;set;}
        public decimal Price {get;set;}
        public decimal Rating {get;set;}

        public string Thumbnail {get;set;}

        public string[] Tags {get;set;}

        public DateTime UpdatedAt {get;set;}
    }
}