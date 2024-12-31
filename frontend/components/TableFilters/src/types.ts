export interface TableFiltersProps {
  filters: VirtualizedTableFiltersState
  handleFilterChange: React.ChangeEventHandler<HTMLInputElement>
}

export interface VirtualizedTableFiltersState {
  title: string;
  category: string;
  brand: string;
}
