import styled from "@emotion/styled";

import MUITableContainer from "@mui/material/TableContainer";

import MUITablePaper from "@mui/material/Paper";
import MUITable from "@mui/material/Table";
import MUITableBody from "@mui/material/TableBody";
import MUITableCell from "@mui/material/TableCell";
import MUITableHead from "@mui/material/TableHead";
import MUITableRow from "@mui/material/TableRow";
import React from "react";

export const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

export const StyledTableContainer = styled(MUITableContainer)``;

export const TableContainer = React.forwardRef(
  (props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <MUITableContainer component={MUITablePaper} ref={ref} {...props} />
  )
);

export const ProductsTable = styled(MUITable)`
  table-layout: fixed;
  border-collapse: separate;
`;

export const TableHeader = styled(MUITableCell)`
  border: 1px solid #ddd;

  text-align: left;
  flex: 1;
`;

export const TableTHead = styled(MUITableHead)`
  width: 100vw;
  position: fixed;
  top: 0;
  background: black;
`;

export const TableTr = styled(MUITableRow)``;

export const TableCell = styled(MUITableCell)`
  border: 1px solid #ddd;

  text-align: left;
  flex: 1;
`;

export const VirtuosoContainer = styled.div`
  height: 80vh;
`;

export const TableTbody = styled(MUITableBody)``;
