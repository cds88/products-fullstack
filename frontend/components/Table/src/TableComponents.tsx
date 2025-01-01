import { Product } from "@products/types";
import { TableVirtuosoProps } from "react-virtuoso";
import { ProductsTable, TableContainer, TableTHead } from "./styled";
import MUITableRow from "@mui/material/TableRow";
import MUITableBody from "@mui/material/TableBody";

export const tableComponents: TableVirtuosoProps<Product, any>["components"] = {
    Scroller: TableContainer,
    Table: ProductsTable,
    TableHead: TableTHead,
    TableRow: MUITableRow,
    TableBody: MUITableBody,
  };
  