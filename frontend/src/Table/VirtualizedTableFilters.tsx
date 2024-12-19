import { FilterInput, Filters, Header } from "./styled";
import { VirtualizedTableFiltersState } from "./types";


interface VirtualzedTableFiltersProps {
    filters: VirtualizedTableFiltersState
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>
}


const VirtualizedTableFilters : React.FC<VirtualzedTableFiltersProps>= ({filters, handleFilterChange}) => {
  return (
    <Header>
      <h1>Products Table</h1>
      <Filters>
        <FilterInput
          type="text"
          name="title"
          placeholder="Search by title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="text"
          name="category"
          placeholder="Search by category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="text"
          name="brand"
          placeholder="Search by brand"
          value={filters.brand}
          onChange={handleFilterChange}
        />
      </Filters>
    </Header>
  );
};

export default VirtualizedTableFilters;
