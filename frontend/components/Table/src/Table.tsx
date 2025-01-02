import { Product } from "@products/types";
import React from "react";
import {
  TableVirtuoso,
  VirtuosoProps
} from "react-virtuoso";
import {
  VirtuosoContainer
} from "./styled";
import { tableComponents } from "./TableComponents";
import TableRecordRow from "./TableRow";
import TableSorters, { TableSortersProps } from "./TableSorters";


export interface VirtualizedTableBodyProps {
  products: Product[];
  loadProducts: VirtuosoProps<Product, any>["endReached"];
  handleSortChange: TableSortersProps["handleSortChange"];
  handleFilterChange: TableSortersProps["handleFilterChange"];
  orderBy: Record<string, string>;
  filters: Record<string, string>;
}
const Table: React.FC<VirtualizedTableBodyProps> = ({
  products,
  loadProducts,
  handleSortChange,
  orderBy,
  handleFilterChange,
  filters
}) => {
  return (
    <VirtuosoContainer>
      <TableVirtuoso
        data={products}
        components={tableComponents}
        fixedHeaderContent={() => (
          <TableSorters
            handleSortChange={handleSortChange}
            orderBy={orderBy}
            handleFilterChange={handleFilterChange}
            filters={filters}
          />
        )}
        itemContent={(index, product) => <TableRecordRow product={product} />}
        endReached={loadProducts}
      />
    </VirtuosoContainer>
  );
};

export default Table;
