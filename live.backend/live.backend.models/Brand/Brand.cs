using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Brand
    {
        public int Id {get;set;}
        [Required]
        public string Name {get;set;}

        public DateTime CreatedAt {get;set;}
    }
}