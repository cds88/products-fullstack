using Xunit;
using Backend.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Tests.Unit.Models
{
    public class ProductTests
    {
        [Fact]
        public void Product_ShouldHaveRequiredTitle()
        {
            var product = new Product { Title = "Test Product" };

            Assert.Equal("Test Product", product.Title);
        }

        [Fact]
        public void Product_ShouldHaveDefaultDescription()
        {

            var product = new Product { Title = "Test Product" };


            var description = product.Description;


            Assert.Equal(string.Empty, description);
        }

        [Fact]
        public void Product_ShouldAllowNullCategoryAndBrand()
        {

            var product = new Product { Title = "Test Product" };


            Assert.Null(product.Category);
            Assert.Null(product.Brand);
        }
    }
}
