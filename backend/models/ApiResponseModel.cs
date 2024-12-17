namespace Live.Models {
    public class ApiResponseModel {
        public int total ;
        public int skip;
        public int limit ;
        public List<Product> products= null!;
    }
}