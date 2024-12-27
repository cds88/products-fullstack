

namespace Backend.Core.DTOs
{
        public class ProductDTO  
    {
        public int Id {get;set;}
        required public string Title {get;set;}
        public string Description {get;set;} = string.Empty;
        required public string Category {get;set;} 
        public string? Brand {get;set;} 
        public decimal Price {get;set;}
        public decimal Rating {get;set;}

        public string Thumbnail {get;set;} = string.Empty;

        public string[] Tags {get;set;} = new string[0];

        public DateTime UpdatedAt {get;set;}
    }
}