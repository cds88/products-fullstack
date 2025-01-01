import { Box, styled } from "@mui/material";
import MUITableCell, { TableCellProps } from "@mui/material/TableCell";
import MUITableRow from "@mui/material/TableRow";
import ArrowIndicator, { ArrowIndicatorWrapper } from "./ArrowIndicator";
import cstyled from "@emotion/styled";
import ArrowDropUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDownward';
export const TableTr = styled(MUITableRow)``;
export const TableHeaderStyled = styled(MUITableCell)`
  /* border: 1px solid #ddd;
padding: 8px;
text-align: left;
cursor: pointer;
background-color: #f4f4f4;
flex:1; */
  border: 1px solid #ddd;

  text-align: left;
  flex: 1;
`;
export const TableHeaderInner = styled(Box)`
  display: flex;
  flex-direction: row;
 
 
`;

export const TableHeaderInnerArrow = cstyled(ArrowIndicator)`
    margin-left:auto ;
`;

type TableHeaderInterface  =  TableCellProps & {
    onClick: React.MouseEventHandler<SVGSVGElement>
    columnName: string;
    value: string;
} 

export const TableHeader: React.FC<TableHeaderInterface> = ({
  children,
  onClick,
  columnName,
  value,
  ...props
}) => {
   return (
    <TableHeaderStyled {...props} aria-sort="ascending" data-column-name={columnName}  >
      <TableHeaderInner>
        <span> {children}</span>
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ value==="asc"? {color:"red"}:   { }}
        onClick={onClick} data-sort-order="asc" data-sort-key={columnName}  aria-label="Sort ascending" aria-pressed={value==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ value==="desc"? {color:"red"}:   { }}
        onClick={onClick} data-sort-order="desc"  data-sort-key={columnName} aria-label="Sort descending" aria-pressed={value==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>
  );
};
