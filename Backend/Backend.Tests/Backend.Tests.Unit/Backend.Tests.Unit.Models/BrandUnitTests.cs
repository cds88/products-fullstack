using Backend.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Unit.Models
{
    public class BrandTests
    {
        [Fact]
        public void Brand_ShouldHaveRequiredName()
        {

            var brand = new Brand { Name = "Test Brand" };


            Assert.Equal("Test Brand", brand.Name);
        }

        [Fact]
        public void Brand_ShouldHaveDefaultCreatedAt()
        {

            var brand = new Brand { Name = "Test Brand" };


            var currentDate = DateTime.Now.Date;
            var createdAt = brand.CreatedAt.Date;


            Assert.Equal(currentDate, createdAt);
        }
    }
}
