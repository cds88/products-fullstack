import styled from "styled-components";


import MUITableContainer from "@mui/material/TableContainer";

import MUITable from "@mui/material/Table";
import MUITableHead from "@mui/material/TableHead";
import MUITableRow from "@mui/material/TableRow";
import MUITableBody from "@mui/material/TableBody";
import MUITableCell from "@mui/material/TableCell";



export const  AppContainer = styled.div`
font-family: Arial, sans-serif;
padding: 20px;
`;

export const  Header = styled.header`
display: flex;
flex-direction: column;
align-items: center;
`;

export const  Filters = styled.div`
margin-bottom: 20px;
display: flex;
gap: 10px;
`;

export const  FilterInput = styled.input`
padding: 10px;
font-size: 14px;
`;

export const TableContainer = styled(MUITableContainer)`

`

export const  ProductsTable = styled(MUITable)`
width: 100%;
border-collapse: collapse;
display: flex;
flex-direction: column;
`;

export const  TableHeader = styled(MUITableCell)`
border: 1px solid #ddd;
padding: 8px;
text-align: left;
cursor: pointer;
background-color: #f4f4f4;
flex:1;
`;

export const  TableTHead = styled(MUITableHead)`
 //display: table-header-group;
 width:100vw;
 position:fixed;
 top:0;
 background: green;
 
`

export const  TableTr = styled(MUITableRow)`
 
  
 
  


`

export const  TableCell = styled(MUITableCell)`
border: 1px solid #ddd;
 
text-align: left;
flex:1;
`;

export const  VirtuosoContainer = styled.div`
height: 80vh;
`;

export const TableTbody = styled(MUITableBody)`

`