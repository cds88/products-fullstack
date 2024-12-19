import { Virtuoso, VirtuosoProps } from "react-virtuoso";

import {
    TableCell,
    TableTbody,
    TableTr,
    VirtuosoContainer
} from "./styled";

interface Product {
  id: number;
  title: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
}

interface VirtualizedTableBodyProps {
  products: Product[];
  loadProducts: VirtuosoProps<Product, any>["endReached"];
}

const VirtualizedTableBody: React.FC<VirtualizedTableBodyProps> = ({
  products,
  loadProducts,
}) => {
  return (
    <TableTbody>
      <VirtuosoContainer>
        <Virtuoso
          data={products}
          itemContent={(index, product) => (
            <TableTr key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.rating.toFixed(2)}</TableCell>
            </TableTr>
          )}
          endReached={loadProducts}
        />
      </VirtuosoContainer>
    </TableTbody>
  );
};

export default VirtualizedTableBody;
