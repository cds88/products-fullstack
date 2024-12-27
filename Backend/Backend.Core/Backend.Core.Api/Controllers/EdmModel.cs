using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Backend.Core.Models;


namespace Backend.Core.Controllers
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