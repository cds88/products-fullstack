import axios from "axios";

export const fetchRelations = async () => {
  const { data } = await axios.get("/api/products-relations");
  return data;
};

type ProductsQueryKey = [
  string,
  {
    filters: Record<string, string>;
    orderBy: Record<string, string>;
    $skip?: number;
  }
];

export const fetchProducts = async ({
  queryKey,
}: {
  queryKey: ProductsQueryKey;
}) => {
  const [, { filters, orderBy, $skip }] = queryKey;
  const params = {
    filters,
    orderBy,
    $skip,
  };

  const response = await axios.post("/api/products", params);
  return response.data;
};
