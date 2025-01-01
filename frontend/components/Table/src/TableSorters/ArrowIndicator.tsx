import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropUpIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightIcon from "@mui/icons-material/DoNotDisturb";
import styled  from "@emotion/styled";

export const ArrowIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;

`;

type ArrowIndicatorProps = {

    onHandleAscOrder: ()=> void, 
    onHandleDescOrder: ()=>void

} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const ArrowIndicator: React.FC<ArrowIndicatorProps> = ({ ...props }) => {
  return (
    <ArrowIndicatorWrapper {...props}>
      <ArrowDropUpIcon  />
 
      <ArrowDropDownIcon />
    </ArrowIndicatorWrapper>
  );
};

export default ArrowIndicator;
