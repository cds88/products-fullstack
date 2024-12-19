using Backend.Models;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Backend.Utils
{
    public static class EdmModelBuilder
    {
        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<Product>("Products");
            return builder.GetEdmModel();
        }
    }
}