import { Product } from "@products/types";
import React from "react";
import { TableVirtuoso, VirtuosoProps } from "react-virtuoso";
import { VirtuosoContainer } from "./styled";
import { tableComponents } from "./TableComponents";
import TableRecordRow from "./TableRow";
import TableSorters, { TableSortersProps } from "../TableSorters";

export interface VirtualizedTableBodyProps {
  state: {
    data: Product[];
    totalCount: number;
  };
  loadProducts: VirtuosoProps<Product, any>["endReached"];
  handleSortChange: TableSortersProps["handleSortChange"];
  handleFilterChange: TableSortersProps["handleFilterChange"];
  orderBy: Record<string, string>;
  filters: Record<string, string>;
  relations: Record<string, Record<string, unknown>[]>;
}
const Table: React.FC<VirtualizedTableBodyProps> = ({
  state,
  loadProducts,
  handleSortChange,
  orderBy,
  handleFilterChange,
  filters,
  relations,
}) => {
   return (
    <VirtuosoContainer>
      <TableVirtuoso
        {...state}
        components={tableComponents}
        fixedHeaderContent={() => (
          <TableSorters
            handleSortChange={handleSortChange}
            orderBy={orderBy}
            handleFilterChange={handleFilterChange}
            filters={filters}
            relations={relations}
          />
        )}
        itemContent={(index, product) => <TableRecordRow product={product} />}
        endReached={loadProducts}
      />
    </VirtuosoContainer>
  );
};

export default Table;
