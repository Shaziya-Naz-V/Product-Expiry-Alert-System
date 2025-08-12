import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 10px 20px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 8px 14px;
  background: transparent;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
  background:black;
  color : white;
  }
`;

const Topbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or session if needed
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update auth state
    setIsAuthenticated(false);

    // Redirect to login
    navigate('/');
  };

  return (
    <Container>
      <Title>📦 Product Expiry Alert</Title>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default Topbar;
