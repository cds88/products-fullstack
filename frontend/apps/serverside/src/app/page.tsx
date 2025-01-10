"use client";

import Footer from "@products/components-footer";
import Table from "@products/components-table";

import { useTableData } from "../hooks/useTableData";
import { Header } from "../styles/styled";

export default function Home() {
  const {
    filters,
    handleFilterChange,
    handleSortChange,
    loadProducts,
    orderBy,
    products,
    relations,
  } = useTableData();
  return (
    <>
      <Header>
        <h1>Products Table</h1>
      </Header>
      <div aria-live="polite">
        <Table
          relations={relations}
          handleFilterChange={handleFilterChange}
          filters={filters}
          orderBy={orderBy}
          state={products}
          loadProducts={loadProducts}
          handleSortChange={handleSortChange}
        />
      </div>
      <Footer />
    </>
  );
}
