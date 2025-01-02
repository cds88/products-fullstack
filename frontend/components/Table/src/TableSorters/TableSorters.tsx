import { styled } from "@mui/system";
import { IconButton, InputAdornment, Rating, TextField } from "@mui/material";
import {
  TableHeader,
  TableHeaderInner,
  TableHeaderInnerArrow,
  TableHeaderStyled,
  TableTr,
} from "./styled";
import { ArrowIndicatorWrapper } from "./ArrowIndicator";
import ArrowDropUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDownward";
import BeautifulDropdown from "../Dropdown";

import ClearIcon from "@mui/icons-material/Clear";
import MultiSelectWithClear from "../MultiDropdown";
import TextFilter from "../TextFilter";
import SortingArrows from "../SortingArrows";
import { TABLE_COLUMNS } from "../const";

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
  const tagsValue = orderBy[TABLE_COLUMNS.TAGS] ||"none"
  return (
    <TableTr>
      <TableHeaderStyled
        aria-sort="ascending"
        data-column-name={TABLE_COLUMNS.TITLE}
      >
        <TableHeaderInner>
          <TextFilter
          value={filters.title }
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
          <BeautifulDropdown
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
          <BeautifulDropdown
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
            handleFilterChange={handleFilterChange}
            label="PRICE"
            name="price"
            placeholder="Filter by price"
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
            handleFilterChange={handleFilterChange}
            label="RATING"
            name="rating"
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
          <MultiSelectWithClear data={relations.tags} label="Tags" value={filters.tags}   handleFilterChange={handleFilterChange}      name="tags"
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
