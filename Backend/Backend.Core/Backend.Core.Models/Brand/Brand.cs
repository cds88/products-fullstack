namespace Backend.Core.Models
{
    public class Brand
    {
        public int Id {get;set;}
        required public string Name {get;set;}

        public DateTime CreatedAt {get;set;}

        public Brand()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}