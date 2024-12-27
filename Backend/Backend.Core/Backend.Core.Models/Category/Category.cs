using System.ComponentModel.DataAnnotations;

namespace Backend.Core.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        required public string Name { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}