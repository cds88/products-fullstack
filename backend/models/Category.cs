using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}