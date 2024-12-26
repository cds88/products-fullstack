using Live.Backend.Models;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace Live.Backend.Controllers
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