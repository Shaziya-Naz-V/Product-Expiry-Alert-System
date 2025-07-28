import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav =styled.div`
 display: flex;
  gap: 30px;
  padding: 12px 20px;
  border-bottom: 1px solid #ccc;
`;
const NavBar = styled.div`
  display: flex;
  width:100%;
  background-color: white;
  border:1px solid black;
  border-radius:4px;
`;

const StyledNavLink = styled(NavLink)`
  color: #000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  width:50%;
  padding: 6px 250px;
  border-radius: 4px;

  &.active {
    background-color: #A19E9D;
    border: 1px solid #ccc;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavBar>
        <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/inventory">Inventory</StyledNavLink>
      </NavBar>
    </Nav>
  );
};

export default Navbar;
