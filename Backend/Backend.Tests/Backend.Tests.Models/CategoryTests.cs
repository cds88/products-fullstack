using Xunit;
using Backend.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Models
{
    public class CategoryTests
    {
        [Fact]
        public void Category_ShouldHaveRequiredName()
        {
 
            var category = new Category{
                Name= "Test Category"
            };

 
 
            Assert.Equal("Test Category", category.Name);
        }

        [Fact]
        public void Category_ShouldHaveDefaultCreatedAt()
        {
            // Arrange
         var category = new Category{
                Name= "Test Category"
            };
            // Act
            var currentDate = DateTime.Now.Date;
            var createdAt = category.CreatedAt.Date;

            // Assert
            Assert.Equal(currentDate, createdAt);
        }
    }
}
