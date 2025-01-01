import { TableHeader, TableTHead, TableTr } from "./styled"
export interface TableSortersProps {
  handleSortChange: ( attributeName: string )=>void
}



const TableSorters: React.FC<TableSortersProps> =({handleSortChange})=>{

    return  <TableTr >
      <TableHeader onClick={() => handleSortChange("title")}>
        Title
      </TableHeader>
      <TableHeader onClick={() => handleSortChange("category")}>
        Category
      </TableHeader>
      <TableHeader onClick={() => handleSortChange("brand")}>
        Brand
      </TableHeader>
      <TableHeader onClick={() => handleSortChange("price")}>
        Price
      </TableHeader>
      <TableHeader onClick={() => handleSortChange("rating")}>
        Rating
      </TableHeader>
    </TableTr>
  
}

export default TableSorters