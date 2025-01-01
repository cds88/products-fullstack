"use client";

import Table from "@products/components-table";
import TableFilters, {
  TableFiltersProps,
  VirtualizedTableFiltersState,
} from "@products/components-table-filters";
import TableSorters, {
  TableSortersProps,
} from "@products/components-table-sorters";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Product } from "@products/types";
import { debounce } from "lodash";

export const FILTER_REQUEST_DEBOUNCE_TIMEOUT = 700;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const [_filters, setFilters] = useState<VirtualizedTableFiltersState>({
    title: "",
    category: "",
    brand: "",
  });
  const filtersRef = useRef<VirtualizedTableFiltersState>(_filters);


  const [sort, setSort] = useState({ field: "", direction: "" });
  const buildODataFilter = () => {
    const filters = filtersRef.current
    const filterConditions = [];
    if (filters.title)
      filterConditions.push(
        `contains(tolower(title), '${filters.title.toLowerCase()}')`
      );
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
      const { data: _data } = await axios.post("/api/products", { params });
      const { $values: data } = _data;

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
        setSkip((prev) => prev + 30);
      }
    } catch (error) {
      console.error("Error loading products", error);
    }
  }, [hasMore, skip, _filters, sort, ]);

  const handleFilterChange: TableFiltersProps["handleFilterChange"] = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    filtersRef.current[name as keyof VirtualizedTableFiltersState] = value;

    handleFilterChangeDebounce();
  };

  const handleFilterChangeDebounce = useMemo(
    () =>
      debounce(() => {
        setProducts([]);
        setSkip(0);
        setHasMore(true);

        loadProducts();
        
      }, 3000),
    []
  );

  const handleSortChange: TableSortersProps["handleSortChange"] = (
    field: string
  ) => {
    setSort((prev) => ({
      field,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
    setProducts([]);
    setSkip(0);
    setHasMore(true);

    loadProducts();

  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{
      height: '70vh',
      width:'70vw'
    }}>
      <TableFilters filters={_filters} handleFilterChange={handleFilterChange} />

      <Table products={products} loadProducts={ loadProducts} handleSortChange={handleSortChange}/>
    </div>
  );
}

//<TableSorters handleSortChange={handleSortChange}/>

//
