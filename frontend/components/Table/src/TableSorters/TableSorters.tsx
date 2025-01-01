import {styled} from "@mui/system"
import { IconButton, InputAdornment, Rating, TextField } from "@mui/material";
import {
  TableHeader,
  TableHeaderInner,
  TableHeaderInnerArrow,
  TableHeaderStyled,
  TableTr,
} from "./styled";
import { ArrowIndicatorWrapper } from "./ArrowIndicator";
import ArrowDropUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDownward';
import BeautifulDropdown from "../Dropdown";

import ClearIcon from '@mui/icons-material/Clear';
import MultiSelectWithClear from "../MultiDropdown";


export interface TableSortersProps {
  handleSortChange: React.MouseEventHandler<SVGSVGElement>;
  handleFilterChange: (args:any)=>void;
  orderBy: Record<string, string>;
}

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
 
});


const TABLE_COLUMNS = {
  TITLE: "title",
  CATEGORY: "category",
  BRAND: "brand",
  PRICE: "price",
  RATING: "rating",
  TAGS: "tags"
} as const;

const handler = function () {};
const TableSorters: React.FC<TableSortersProps> = ({
  handleSortChange,
  orderBy,
}) => {

  const titleValue = orderBy[TABLE_COLUMNS.TITLE] || "none"
  const categoryValue = orderBy[TABLE_COLUMNS.CATEGORY] || "none"
  const brandValue = orderBy[TABLE_COLUMNS.BRAND] || "none"
  const priceValue = orderBy[TABLE_COLUMNS.PRICE] || "none"
  const ratingValue = orderBy[TABLE_COLUMNS.RATING] || "none"
  return (
    <TableTr>
      {/* <TableHeader
        onClick={handleSortChange}
        columnName={TABLE_COLUMNS.TITLE}
        value={orderBy[TABLE_COLUMNS.TITLE] || "none"}
      >
        <CustomTextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          // value={""}
          // onChange={handler}
        />
      </TableHeader> */}

      <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.TITLE}  >
      <TableHeaderInner>
      <TextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          
          label="TITLE"
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: true && (
                <InputAdornment position="end">
                  <IconButton onClick={function(){}} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        />
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ titleValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.TITLE}  aria-label="Sort ascending" aria-pressed={titleValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ titleValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.TITLE} aria-label="Sort descending" aria-pressed={titleValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled> 
    {/* <TableHeader
        onClick={handleSortChange}
        columnName={TABLE_COLUMNS.CATEGORY}
        value={orderBy[TABLE_COLUMNS.CATEGORY] || "none"}
      >
        {TABLE_COLUMNS.CATEGORY.toUpperCase()}
      </TableHeader>         */}
    <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.CATEGORY}  >
      <TableHeaderInner>
        <BeautifulDropdown/>
        
      {/* <TextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          
          label="TITLE"
          variant="outlined"
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        /> */}
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ categoryValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.CATEGORY}  aria-label="Sort ascending" aria-pressed={categoryValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ categoryValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.CATEGORY} aria-label="Sort descending" aria-pressed={categoryValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>   

      {/* <TableHeader
        onClick={handleSortChange}
        columnName={TABLE_COLUMNS.BRAND}
        value={orderBy[TABLE_COLUMNS.BRAND] || "none"}
      >
        {TABLE_COLUMNS.BRAND.toUpperCase()}
      </TableHeader> */}
      <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.BRAND}  >
      <TableHeaderInner>
        {/* <BeautifulDropdown/> */}
        <MultiSelectWithClear/>
      {/* <TextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          
          label="TITLE"
          variant="outlined"
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        /> */}
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ brandValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.BRAND}  aria-label="Sort ascending" aria-pressed={brandValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ brandValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.BRAND} aria-label="Sort descending" aria-pressed={brandValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>        
      {/* <TableHeader
        onClick={handleSortChange}
        columnName={TABLE_COLUMNS.PRICE}
        value={orderBy[TABLE_COLUMNS.PRICE] || "none"}
      >
        {TABLE_COLUMNS.PRICE.toUpperCase()}
      </TableHeader> */}
      <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.PRICE}  >
      <TableHeaderInner>
      <TextField
          type="text"
          name="title"
          placeholder="Search by price"
          fullWidth
          
          label="PRICE"
          variant="outlined"
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        />
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ priceValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.PRICE}  aria-label="Sort ascending" aria-pressed={priceValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ priceValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.PRICE} aria-label="Sort descending" aria-pressed={priceValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>       
      {/* <TableHeader
        onClick={handleSortChange}
        columnName={TABLE_COLUMNS.RATING}
        value={orderBy[TABLE_COLUMNS.RATING] || "none"}
      >
        {TABLE_COLUMNS.RATING.toUpperCase()}
      </TableHeader> */}
      <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.RATING}  >
      <TableHeaderInner>
      <TextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          
          label="RATING"
          variant="outlined"
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        />
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        style={ ratingValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.RATING}  aria-label="Sort ascending" aria-pressed={ratingValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        style={ ratingValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.RATING} aria-label="Sort descending" aria-pressed={ratingValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>         

    <TableHeaderStyled  aria-sort="ascending" data-column-name={TABLE_COLUMNS.TAGS}  >
      <TableHeaderInner>
        {/* <BeautifulDropdown/> */}
        <MultiSelectWithClear/>
      {/* <TextField
          type="text"
          name="title"
          placeholder="Search by title"
          fullWidth
          
          label="TITLE"
          variant="outlined"
          sx={{
            flexGrow:1,
            padding:0,
            height: '56px', // Set the desired height
            '& .MuiOutlinedInput-root': {
            
              '& .MuiInputBase-input': {
                padding: '16.5px 14px', // Adjust padding to center the text vertically
              },
            },            
            '& .MuiInputBase-input': {
              lineHeight: '3.5', // Adjust line height as needed
            },
          }}          
          // value={""}
          // onChange={handler}
        /> */}
        <ArrowIndicatorWrapper >
        <ArrowDropUpIcon 
        sx={{visibility:'hidden'}}
        style={ brandValue==="asc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="asc" data-sort-key={TABLE_COLUMNS.BRAND}  aria-label="Sort ascending" aria-pressed={brandValue==="asc"} role="button" tabIndex={1}/>
    
        <ArrowDropDownIcon 
        sx={{visibility:'hidden'}}
        style={ brandValue==="desc"? {color:"red"}:   { }}
        onClick={handleSortChange} data-sort-order="desc"  data-sort-key={TABLE_COLUMNS.BRAND} aria-label="Sort descending" aria-pressed={brandValue==="desc"} role="button" tabIndex={1}/>
        </ArrowIndicatorWrapper>
      </TableHeaderInner>
    </TableHeaderStyled>  

    </TableTr>
  );
};

export default TableSorters;
