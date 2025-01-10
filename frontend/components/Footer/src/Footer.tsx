import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #eaeaea;
  width: 100%;
  
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
`;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Text>&copy;  Products App. All rights reserved.</Text>
        <LinksWrapper>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </LinksWrapper>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;