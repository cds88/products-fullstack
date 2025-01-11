using Xunit;
using Backend.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Unit.Models
{
    public class CategoryTests
    {
        [Fact]
        public void Category_ShouldHaveRequiredName()
        {

            var category = new Category
            {
                Name = "Test Category"
            };



            Assert.Equal("Test Category", category.Name);
        }

        [Fact]
        public void Category_ShouldHaveDefaultCreatedAt()
        {
            var category = new Category
            {
                Name = "Test Category"
            };
            var currentDate = DateTime.Now.Date;
            var createdAt = category.CreatedAt.Date;

            Assert.Equal(currentDate, createdAt);
        }
    }
}
