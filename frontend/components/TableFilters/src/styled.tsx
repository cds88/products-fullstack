import styled from '@emotion/styled';


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

export const  ProductsTable = styled.table`
width: 100%;
border-collapse: collapse;
display: flex;
flex-direction: column;
`;

export const  TableHeader = styled.th`
border: 1px solid #ddd;
padding: 8px;
text-align: left;
cursor: pointer;
background-color: #f4f4f4;
flex:1;
`;

export const  TableTHead = styled.thead`
  display: flex;

`

export const  TableTr = styled.tr`
  flex:1;
  width:100%;
  display: flex;

`

export const  TableCell = styled.td`
border: 1px solid #ddd;
padding: 8px;
text-align: left;
flex:1;
`;

export const  VirtuosoContainer = styled.div`
height: 80vh;
`;

export const TableTbody = styled.tbody`

`