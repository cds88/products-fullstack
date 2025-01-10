import { Product } from "@products/types";
import { TableCell } from "./styled";

const TableRecordRow: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.rating.toFixed(2)}</TableCell>
      <TableCell>{product.tags.join(",")}</TableCell>
    </>
  );
};

export default TableRecordRow;
