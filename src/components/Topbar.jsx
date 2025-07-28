import React from 'react';
import styled from 'styled-components';

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Topbar = () => {
  return (
    <TopbarContainer>
      <LeftSection>
        <Title>📦 Product Expiry Alert System</Title>
      </LeftSection>
      <LogoutButton>Logout</LogoutButton>
    </TopbarContainer>
  );
};

export default Topbar;
