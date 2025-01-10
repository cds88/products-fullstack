import { useRouter } from "next/navigation";
import { useAppQueryParams } from "./useAppQueryParams";
import { useQuery } from "@tanstack/react-query";
import { fetchRelations } from "@/utils/queryFetchers";
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { Product } from "@products/types";
 
import axios from 'axios';
import { debounce, isArray } from "lodash";
import { TABLE_COLUMNS_ARRAY } from "../const";
import { parsePathString } from "@/lib/parsePathString";


export const useTableData = ()=>{
    const router = useRouter();
    const { orderBy, filters, pathString } = useAppQueryParams();
  
    const { data: relations } = useQuery({
      queryFn: fetchRelations,
      queryKey: ["relations"],
      initialData: {},
    });
  
    const [products, setProducts] = useState<{
      data: Product[];
      totalCount: number;
    }>({
      data: [],
      totalCount: 0,
    });
  
    const loadProducts = ($skip: number) => {
      if ($skip >= products.totalCount) {
        return;
      }
      const params = parsePathString({
        orderBy,
        filters,
      });
  
      axios.post("/api/products", { ...params, $skip }).then((results) => {
        const response = results.data;
        setProducts((state) => ({
          data: [...state.data, ...response.data],
          totalCount: state.totalCount,
        }));
      });
    };
  
    useEffect(() => {
      axios.post("/api/products", {}).then((results) => {
        const response = results.data;
        setProducts({
          data: response.data,
          totalCount: response.totalCount,
        });
      });
    }, []);
  
    const debouncedFetch = useMemo(
      () =>
        debounce((params) => {
          axios
            .post("api/products", params)
            .then((results) => {
              const response = results.data;
              setProducts({
                data: response.data,
                totalCount: response.totalCount,
              });
            })
            .catch(console.error);
        }, 500),
      []
    );
  
    useEffect(() => {
      const params = parsePathString({
        orderBy,
        filters,
      });
  
      debouncedFetch(params);
    }, [pathString]);
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
  
      const params = new URLSearchParams(pathString);
  
      const order = params.get("$orderby");
      const orderPrepended = order ? "$orderby=" + order : "";
  
      const queryFilters: Record<string, string> = {
        ...filters,
        [name]: isArray(value) ? value.join(",") : value,
      };
  
      const filtersConditions: string[] = [];
  
      TABLE_COLUMNS_ARRAY.forEach((key) => {
        const val = queryFilters[key];
        if (!val) return;
        filtersConditions.push(`${key}=${val}`);
      });
  
      const filteredPrepened = orderPrepended ? "&" : "";
  
      const urlString =
        "?" + orderPrepended + filteredPrepened + filtersConditions.join("&");
  
      router.push(urlString);
    };
  
    const handleSortChange: MouseEventHandler<SVGSVGElement> = (event) => {
      const key = event.currentTarget.getAttribute("data-sort-key")!;
      const order = event.currentTarget.getAttribute("data-sort-order");
  
      const params = new URLSearchParams(pathString);
  
      params.delete("$orderby");
  
      const filterConditions: string[] = [];
      TABLE_COLUMNS_ARRAY.forEach((key) => {
        const val = params.get(key);
        if (!val) return;
        filterConditions.push(`${key}=${val}`);
      });
  
      const stringCondition = filterConditions.join("&");
  
      const currentOrder = orderBy[key];
  
      const newOrder = currentOrder === order ? "none" : order;
  
      const results = {
        ...orderBy,
        [key]: newOrder,
      };
  
      const orderCondition = Object.entries(results)
        .reduce<string[]>(
          (acc, [key, val]) =>
            val === "none" || undefined ? acc : [...acc, `${key} ${val}`],
          []
        )
        .join(",");
  
      const queryResults = orderCondition ? "?$orderby=" + orderCondition : "";
  
      const nextStringcondition = queryResults
        ? "&" + stringCondition
        : stringCondition
        ? "?" + stringCondition
        : stringCondition;
  
      const resultas = queryResults + nextStringcondition;
  
      router.push(resultas ? resultas : "/");
    };
  
    return {
        loadProducts, handleSortChange, handleFilterChange, products, orderBy, filters, relations
    } 
}