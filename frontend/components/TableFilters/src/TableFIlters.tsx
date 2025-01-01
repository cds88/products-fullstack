import BeautifulDropdown from "./Dropdown"
import { FilterInput, Filters, Header } from "./styled"
import { TableFiltersProps, VirtualizedTableFiltersState } from "./types"
import {TextField} from "@mui/material"





const TableFilters: React.FC<TableFiltersProps> =({filters, handleFilterChange})=>{

    return  <Header>
    <h1>Products Table</h1>
    <Filters>
      <TextField
        type="text"
        name="title"
        placeholder="Search by title"
        value={"Wer"}
        onChange={handleFilterChange}
      />
      <BeautifulDropdown/>
      <BeautifulDropdown/>
      {/* <FilterInput
        type="text"
        name="category"
        placeholder="Search by category"
        value={filters.category}
        onChange={handleFilterChange}
      /> */}
      <TextField
        type="text"
        name="brand"
        placeholder="Search by brand"
        value={filters.brand}
        onChange={handleFilterChange}
      />
      <TextField
        type="text"
        name="rating"
        placeholder="Search by rating"
        value={filters.rating}
        onChange={handleFilterChange}
      />
    </Filters>
  </Header>
}

export default TableFilters