import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { FILTER_REQUEST_DEBOUNCE_TIMEOUT, URL_ENDPOINT } from "./const";
import {
  AppContainer,
  ProductsTable,
  TableHeader,
  TableTHead,
  TableTr,
} from "./styled";
import { VirtualizedTableFiltersState } from "./types";
import VirtualizedTableBody from "./VirtualizedTableBody";
import VirtualizedTableFilters from "./VirtualizedTableFilters";
import { debounce } from "lodash";

function VirtualizedTable() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<VirtualizedTableFiltersState>({
    title: "",
    category: "",
    brand: "",
  });
  const [sort, setSort] = useState({ field: "", direction: "" });
  const buildODataFilter = () => {
    const filterConditions = [];
    if (filters.title)
      filterConditions.push(`contains(tolower(title), '${filters.title.toLowerCase()}')`);
    if (filters.category)
      filterConditions.push(`category eq '${filters.category}'`);
    if (filters.brand) filterConditions.push(`brand eq '${filters.brand}'`);

    return filterConditions.length > 0
      ? filterConditions.join(" and ")
      : undefined;
  };

  const loadProducts = useCallback(async () => {
    if (!hasMore) return;

     try {
      const params = {
        $skip: skip,
        $top: 30,
        $filter: buildODataFilter(),

        $sort: sort.field ? `${sort.field}:${sort.direction}` : undefined,
      };
      const { data : _data } = await axiosClient.get(URL_ENDPOINT, { params });
      const { $values : data} = _data

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setSkip((prev) => prev + 30);
      }
    } catch (error) {
      console.error("Error loading products", error);
    }
  }, [hasMore, skip, filters, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    handleFilterChangeDebounce();
  };

  const handleFilterChangeDebounce = useMemo(
    () =>
      debounce(() => {
        setProducts([]);
        setSkip(0);
        setHasMore(true);
      }, FILTER_REQUEST_DEBOUNCE_TIMEOUT),
    []
  );

  const handleSortChange = (field) => {
    setSort((prev) => ({
      field,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <AppContainer>
      <VirtualizedTableFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
      />

      <ProductsTable>
        <TableTHead>
          <TableTr style={{ background: "red" }}>
            <TableHeader onClick={() => handleSortChange("title")}>
              Title
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("category")}>
              Category
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("brand")}>
              Brand
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("price")}>
              Price
            </TableHeader>
            <TableHeader onClick={() => handleSortChange("rating")}>
              Rating
            </TableHeader>
          </TableTr>
        </TableTHead>
        <VirtualizedTableBody products={products} loadProducts={loadProducts} />
      </ProductsTable>
    </AppContainer>
  );
}

export default VirtualizedTable;
