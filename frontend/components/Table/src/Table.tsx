import { Product } from "@products/types";
import { ProductsTable, TableCell, TableHeader, TableTbody, TableTHead, TableTr, VirtuosoContainer } from "./styled";
import { Virtuoso, VirtuosoProps, TableVirtuoso, TableVirtuosoProps } from "react-virtuoso";
import React, { Children } from "react";
import MUITableContainer from "@mui/material/TableContainer";
import MUITable from "@mui/material/Table";
import MUITableHead from "@mui/material/TableHead";
import MUITableRow from "@mui/material/TableRow";
import MUITableBody from "@mui/material/TableBody";
import MUITableCell from "@mui/material/TableCell";
import MUITablePaper from "@mui/material/Paper"

const components: TableVirtuosoProps<Product, any>['components'] = {
      Scroller: React.forwardRef( (props, ref)=><MUITableContainer  component={MUITablePaper}  ref={ref} {...props}  
      
      />),
      Table: (props) => <MUITable {...props} style={{borderCollapse:'separate', tableLayout:'fixed'}}/>,
      TableHead: TableTHead,
      TableRow: MUITableRow,
      TableBody: React.forwardRef( (props, ref) => <MUITableBody {...props} ref={ref} />)
    }

//const TableRecordRowCell = MUITableCell
const TableRecordRowCell = TableCell
const TableHeaderRowCell = TableRecordRowCell

const TableHeaderRow =()=>{
  return <TableTr>
  <TableHeaderRowCell>Title</TableHeaderRowCell>
  <TableHeaderRowCell>Category</TableHeaderRowCell>
  <TableHeaderRowCell>Brand</TableHeaderRowCell>
  <TableHeaderRowCell>Price</TableHeaderRowCell>
  <TableHeaderRowCell>Rating</TableHeaderRowCell>
  
</TableTr>
}

const TableRecordRow : React.FC<{product:Product}> =({product})=>{

  return       <  >
  <TableRecordRowCell>{product.title}</TableRecordRowCell>
  <TableRecordRowCell>{product.category}</TableRecordRowCell>
  <TableRecordRowCell>{product.brand}</TableRecordRowCell>
  <TableRecordRowCell>${product.price.toFixed(2)}</TableRecordRowCell>
  <TableRecordRowCell>{product.rating.toFixed(2)}</TableRecordRowCell>
</>
}


interface VirtualizedTableBodyProps {
  products: Product[];
  loadProducts: VirtuosoProps<Product, any>["endReached"];
 
}
const Table: React.FC<VirtualizedTableBodyProps> = ({
  products,
  loadProducts,
 
}) => {
  return     <VirtuosoContainer>
  <TableVirtuoso
    data={products}
    components={components}
    fixedHeaderContent={()=> <TableHeaderRow/>}
    // fixedHeaderContent={() => (
    //   <MUITable.TableRow>
    //     <MUITable.TableCell style={{ width: 150, background: 'white' }}>
    //       Name
    //     </MUITable.TableCell>
    //     <MUITable.TableCell style={{ background: 'white' }}>
    //       Description
    //     </MUITable.TableCell>
    //   </MUITable.TableRow>
    // )}

 
    itemContent={(index, product) => <TableRecordRow product={product}/>}
    endReached={loadProducts}
  />
</VirtuosoContainer>
  // return (
  //   <VirtuosoContainer>
  //     <Virtuoso
  //       data={products}
  //       as="table"
 
  //       components={{
  //         List: (props)=>{
  //           const {children, ref, style} = props
 
  //             return <ProductsTable ref={ref}  {...props} ><TableTbody    {...props}>{children}</TableTbody></ProductsTable>

  //         },
  //          Item: TableTr,
       

          
 
        
  //       }}
  //       itemContent={(index, product) => (
  //         <  >
  //           <TableCell>{product.title}</TableCell>
  //           <TableCell>{product.category}</TableCell>
  //           <TableCell>{product.brand}</TableCell>
  //           <TableCell>${product.price.toFixed(2)}</TableCell>
  //           <TableCell>{product.rating.toFixed(2)}</TableCell>
  //         </>
  //       )}
  //       endReached={loadProducts}
  //     />
  //   </VirtuosoContainer>
 // );
};

export default Table;
