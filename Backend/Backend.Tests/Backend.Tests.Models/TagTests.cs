using Backend.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Models
{
    public class TagTests
    {
        [Fact]
        public void Tag_ShouldHaveRequiredName()
        {
 
            var tag = new Tag{
                Name="Test Tag"
            };

      
            Assert.Equal("Test Tag" , tag.Name);
            
        }
    }
}
