"use client";

import Table from "@products/components-table";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "./getTheme";
import { useAppQueryParams } from "./hooks";

import { debounce, isArray } from "lodash";
import { Header, TABLE_COLUMNS_ARRAY } from "./Components";
import { parsePathString } from "./tools";



export default function Home() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => getTheme(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode]
  );

  const router = useRouter();
  const pathName = usePathname();

  const [products, setProducts] = useState([]);
  const [relations, setRelations] = useState({});

  const { orderBy, filters, pathString } = useAppQueryParams();
  

  const loadProducts = (qwe :any)=>{
 

  }

  useEffect(() => {
    axios.get("/api/products-relations").then((results) => {
      setRelations(results.data);
    });
    axios.post("/api/products", {}).then((results) => {
      setProducts(results.data);
 
    });
  }, []);

  const debouncedFetch = useMemo(()=>debounce((params)=>{
    axios.post("api/products", params).then((results) => {
      setProducts(results.data);
    }).catch(er=>{});
  },500) ,[])

  useEffect(() => {
    const params = parsePathString({
      orderBy,
      filters,
    });

    debouncedFetch(params)

  }, [pathString]);

  return (
    <ThemeProvider theme={theme}>

      <Header>
        <h1>Products Table</h1>
      </Header>
      <div aria-live="polite">
        <Table
          relations={relations}
          handleFilterChange={function (event) {
            const name = event.target.name;
            const value = event.target.value;

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
              "?" +
              orderPrepended +
              filteredPrepened +
              filtersConditions.join("&");

            router.push(urlString);
          }}
          filters={filters}
          orderBy={orderBy}
          products={products}
          loadProducts={loadProducts}
          handleSortChange={function (event) {
            const params = new URLSearchParams(pathString);

            params.delete("$orderby");

            const filterConditions: string[] = [];
            TABLE_COLUMNS_ARRAY.forEach((key) => {
              const val = params.get(key);
              if (!val) return;
              filterConditions.push(`${key}=${val}`);
            });

            const stringCondition = filterConditions.join("&");

            const key = event.currentTarget.getAttribute("data-sort-key")!;
            const order = event.currentTarget.getAttribute("data-sort-order");

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

            const queryResults = orderCondition
              ? "?$orderby=" + orderCondition
              : "";

            const nextStringcondition = queryResults
              ? "&" + stringCondition
              : stringCondition
              ? "?" + stringCondition
              : stringCondition;

            const resultas = queryResults + nextStringcondition;

            router.push(resultas ? resultas : "/");
          }}
        />
      </div>

    </ThemeProvider>
  );
}
