import { Product } from "@products/types";
import { ProductsTable, TableCell, TableContainer, TableHeader, TableTbody, TableTHead, TableTr, VirtuosoContainer } from "./styled";
import { Virtuoso, VirtuosoProps, TableVirtuoso, TableVirtuosoProps } from "react-virtuoso";
import React, { Children } from "react";
import MUITableContainer from "@mui/material/TableContainer";
import MUITable from "@mui/material/Table";
import MUITableHead from "@mui/material/TableHead";
import MUITableRow from "@mui/material/TableRow";
import MUITableBody from "@mui/material/TableBody";
import MUITableCell from "@mui/material/TableCell";
import MUITablePaper from "@mui/material/Paper"
import TableSorters, { TableSortersProps } from "./TableSorters";

const components: TableVirtuosoProps<Product, any>['components'] = {
      Scroller: TableContainer,
      Table:ProductsTable,
      TableHead: TableTHead,
      TableRow: MUITableRow,
      TableBody:MUITableBody
    }

 

const TableHeaderRow =()=>{
  return <TableTr>
  <TableCell>Title</TableCell>
  <TableCell>Category</TableCell>
  <TableCell>Brand</TableCell>
  <TableCell>Price</TableCell>
  <TableCell>Rating</TableCell>
  
</TableTr>
}

const TableRecordRow : React.FC<{product:Product}> =({product})=>{

  return       <  >
  <TableCell>{product.title}</TableCell>
  <TableCell>{product.category}</TableCell>
  <TableCell>{product.brand}</TableCell>
  <TableCell>${product.price.toFixed(2)}</TableCell>
  <TableCell>{product.rating.toFixed(2)}</TableCell>
</>
}


interface VirtualizedTableBodyProps {
  products: Product[];
  loadProducts: VirtuosoProps<Product, any>["endReached"];
  handleSortChange: TableSortersProps['handleSortChange']
 
}
const Table: React.FC<VirtualizedTableBodyProps> = ({
  products,
  loadProducts,
  handleSortChange
 
}) => { 
  return     <VirtuosoContainer>
  <TableVirtuoso
    data={products}
    components={components}
    fixedHeaderContent={()=> <TableSorters handleSortChange={handleSortChange}/>}
 
 
    itemContent={(index, product) => <TableRecordRow product={product}/>}
    endReached={loadProducts}
    
  />
</VirtuosoContainer>
};

export default Table;
