"use client";

import Table from "@products/components-table";
import TableFilters from "@products/components-table-filters";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "./getTheme";
import { useAppQueryParams } from "./hooks";

import styled from "@emotion/styled"

export const  Header = styled.header`
display: flex;
flex-direction: column;
align-items: center;
padding: 15px;
`;


export const FILTER_REQUEST_DEBOUNCE_TIMEOUT = 700;

export default function Home() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => getTheme(prefersDarkMode ? "dark" : "light"), [
    prefersDarkMode,
  ]);


  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [tags, setTags] = useState([])

  const { orderBy, filters } = useAppQueryParams();

  

  useEffect(() => {
    axios.get("/api/products-relations").then(results=>{
      console.log("results", results.data )
      setCategories(results.data.categories.$values)
      setBrands(results.data.brands.$values)
      setTags(results.data.tags.$values)
    })
    axios.post("/api/products", {}).then((results) => {
      setProducts(results.data);
    });
    
  }, []);

   return (
    <ThemeProvider theme={theme}>
      <Header><h1>Products Table</h1></Header>
      <div aria-live="polite">
   

        <Table
        handleFilterChange={function (event) {

          

          const name = event.target.name;
           const value = event.target.value;

           
          const newQueryFilters = {
            [name]: value,
          };
          const queryResults = Object.entries(newQueryFilters).reduce<
            string[]
          >(
            (acc, [key, val]) =>
              val === "" ? acc : [...acc, `contains(tolower(${key}),  )`],
            []
          );

           console.log(queryResults);
          // //router.push()
        }}
        filters={filters}
          orderBy={orderBy}
          products={products}
          loadProducts={function () {}}
          handleSortChange={function (event) {
            const key = event.currentTarget.getAttribute("data-sort-key")!;
            const order = event.currentTarget.getAttribute("data-sort-order");

            const currentOrder = orderBy[key];

            const newOrder = currentOrder === order ? "none" : order;

            const results = {
              ...orderBy,
              [key]: newOrder,
            };

            const queryResults =
              "?$orderby=" +
              Object.entries(results)
                .reduce<string[]>(
                  (acc, [key, val]) =>
                    val === "none" || undefined
                      ? acc
                      : [...acc, `${key} ${val}`],
                  []
                )
                .join(", ");
            router.push(queryResults);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
