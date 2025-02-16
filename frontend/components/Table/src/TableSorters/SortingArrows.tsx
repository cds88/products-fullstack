import styled from "@emotion/styled";
import ArrowDropUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDownward";
const ArrowIndicatorWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
margin-left: auto;
`;
interface SortingArrowsProps {
  value: string;
  handleSortChange: React.MouseEventHandler<SVGSVGElement>;
  sortKey: string;
}

const SortingArrows: React.FC<SortingArrowsProps> = ({
  value,
  handleSortChange,
  sortKey,
}) => {
  return (
    <ArrowIndicatorWrapper>
      <ArrowDropUpIcon
        style={value === "asc" ? { color: "red" } : {}}
        onClick={handleSortChange}
        data-sort-order="asc"
        data-sort-key={sortKey}
        aria-label="Sort ascending"
        aria-pressed={value === "asc"}
        role="button"
        tabIndex={1}
      />

      <ArrowDropDownIcon
        style={value === "desc" ? { color: "red" } : {}}
        onClick={handleSortChange}
        data-sort-order="desc"
        data-sort-key={sortKey}
        aria-label="Sort descending"
        aria-pressed={value === "desc"}
        role="button"
        tabIndex={1}
      />
    </ArrowIndicatorWrapper>
  );
};

export default SortingArrows;
