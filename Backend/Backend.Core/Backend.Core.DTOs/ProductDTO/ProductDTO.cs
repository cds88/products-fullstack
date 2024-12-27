

namespace Backend.Core.DTOs
{
        public class ProductDTO  
    {
        public int Id {get;init;}
        required public string Title {get;init;}
        public string Description {get;init;} = string.Empty;
        required public string Category {get;init;} 
        public string? Brand {get;init;} 
        public decimal Price {get;init;}
        public decimal Rating {get;init;}

        public string Thumbnail {get;init;} = string.Empty;

        public string[] Tags {get;init;} = new string[0];

        public DateTime UpdatedAt {get;init;}
    }
}