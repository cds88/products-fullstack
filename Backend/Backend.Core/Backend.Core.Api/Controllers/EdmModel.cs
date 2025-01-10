using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Backend.Core.Models;
using Backend.Core.DTOs;


namespace Backend.Core.Api
{
    public static class EdmModelBuilder
    {
        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EnableLowerCamelCase();
            builder.EntitySet<ProductDTO>("Products");


            return builder.GetEdmModel();
        }
    }
}





