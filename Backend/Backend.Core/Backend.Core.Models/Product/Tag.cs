namespace Backend.Core.Models 
{
    public class Tag 
    {
        public int Id {get;set;}
        
 
        required public string Name {get;set;}
        public DateTime CreatedAt {get;set;}

        public Tag()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}