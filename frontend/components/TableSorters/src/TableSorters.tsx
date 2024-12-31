import { TableHeader, TableTHead, TableTr } from "./styled"
import { TableSortersProps } from "./types"




const TableSorters: React.FC<TableSortersProps> =({handleSortChange})=>{

    return         <TableTHead>
    <TableTr style={{ background: "red" }}>
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
  </TableTHead>
}

export default TableSorters