import ProductsDropdown from "../TableFilters/Dropdown";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import MUITableCell, { TableCellProps } from "@mui/material/TableCell";
import MUITableRow from "@mui/material/TableRow";
import MultiSelectWithClear from "../TableFilters/MultiDropdown";
import SortingArrows from "./SortingArrows";
import TextFilter from "../TableFilters/TextFilter";
import { TABLE_COLUMNS } from "../const";
import { createNumericFilterHandler } from "./utils/createNumericFilterHandler";

export const TableTr = styled(MUITableRow)``;
export const TableHeaderStyled = styled(MUITableCell)`
  border: 1px solid #ddd;

  text-align: left;
  flex: 1;
`;
export const TableHeaderInner = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export interface TableSortersProps {
  handleSortChange: React.MouseEventHandler<SVGSVGElement>;
  handleFilterChange: (args: any) => void;
  orderBy: Record<string, string>;
  filters: Record<string, string>;
  relations: Record<string, Record<string, unknown>[]>;
}

const TableSorters: React.FC<TableSortersProps> = ({
  handleSortChange,
  orderBy,
  filters,
  handleFilterChange,
  relations,
}) => {
  const titleValue = orderBy[TABLE_COLUMNS.TITLE] || "none";
  const categoryValue = orderBy[TABLE_COLUMNS.CATEGORY] || "none";
  const brandValue = orderBy[TABLE_COLUMNS.BRAND] || "none";
  const priceValue = orderBy[TABLE_COLUMNS.PRICE] || "none";
  const ratingValue = orderBy[TABLE_COLUMNS.RATING] || "none";
  const tagsValue = orderBy[TABLE_COLUMNS.TAGS] || "none";

  return (
    <TableTr>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.TITLE}
      >
        <TableHeaderInner>
          <TextFilter
            value={filters.title}
            handleFilterChange={handleFilterChange}
            label="TITLE"
            name="title"
            placeholder={"Search by title"}
          />
          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.TITLE}
            value={titleValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.CATEGORY}
      >
        <TableHeaderInner>
          <ProductsDropdown
            onChange={handleFilterChange}
            value={filters["category"]}
            name={"category"}
            data={relations.categories}
            label="Category"
          />

          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.CATEGORY}
            value={categoryValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.BRAND}
      >
        <TableHeaderInner>
          <ProductsDropdown
            onChange={handleFilterChange}
            value={filters["brand"]}
            name="brand"
            data={relations.brands}
            label="Brand"
          />

          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.BRAND}
            value={brandValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.PRICE}
      >
        <TableHeaderInner>
          <TextFilter
            value={filters.price}
            handleFilterChange={createNumericFilterHandler(handleFilterChange)}
            label="PRICE"
            name="price"
            placeholder="Filter by price"
            type="number"
          />
          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.PRICE}
            value={priceValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.RATING}
      >
        <TableHeaderInner>
          <TextFilter
            value={filters.rating}
            placeholder="Search by rating"
            handleFilterChange={createNumericFilterHandler(handleFilterChange)}
            label="RATING"
            name="rating"
            type="number"
          />
          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.RATING}
            value={ratingValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>

      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.TAGS}
      >
        <TableHeaderInner>
          <MultiSelectWithClear
            data={relations.tags}
            label="Tags"
            value={filters.tags}
            handleFilterChange={handleFilterChange}
            name="tags"
          />
          <SortingArrows
            handleSortChange={handleSortChange}
            sortKey={TABLE_COLUMNS.TAGS}
            value={tagsValue}
          />
        </TableHeaderInner>
      </TableHeaderStyled>
    </TableTr>
  );
};

export default TableSorters;
