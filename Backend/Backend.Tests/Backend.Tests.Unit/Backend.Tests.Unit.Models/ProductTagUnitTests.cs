using Xunit;
using Backend.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Unit.Models
{
    public class ProductTagTests
    {
        [Fact]
        public void ProductTag_ShouldHaveRequiredProductAndTag()
        {
            var productTag = new ProductTag
            {
                Product = new Product { Title = "Test Product", Price = 10 },
                Tag = new Tag { Name = "Test Tag " }
            };

            var validationResults = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(productTag, new ValidationContext(productTag), validationResults, true);

            Assert.True(isValid);

        }
    }
}
