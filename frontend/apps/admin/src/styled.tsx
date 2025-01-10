import Footer from "@products/components-footer";
import styled from "@emotion/styled";

export const AdminWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const AdminHeader = styled.h2``;
export const AdminContent = styled.div`
  flex: 1;
`;

export const AdminFooter = styled(Footer)`
  margin-top: auto;
  width: 100%;
`;
