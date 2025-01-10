using System.Text;

using Backend.Core.DTOs;

namespace Backend.Core.Models
{
    public class ApiResponse
    {
        public List<ProductDTO> Products { get; set; } = new();
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }

        public void Deconstruct(out List<ProductDTO> Products, out int Total, out int Skip, out int Limit)
        {
            Products = this.Products;
            Total = this.Total;
            Skip = this.Skip;
            Limit = this.Limit;
        }

        public override string ToString()
        {
            var sb = new StringBuilder();

            sb.AppendLine($"Total Products: {Total}");
            sb.AppendLine($"Skip: {Skip}");
            sb.AppendLine($"Limit: {Limit}");
            sb.AppendLine($"Number of Products Fetched: {Products.Count}");

            return sb.ToString();
        }


    }

}