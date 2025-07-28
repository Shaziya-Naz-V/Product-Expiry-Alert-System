import React from 'react';
import styled from 'styled-components';

const getStatusColor = (status) => {
  if (status === 'Expired') return '#d9938dff';
  if (status === 'Expiring Soon') return '#e7b569ff';
  return '#7fe482ff';
};

const Card = styled.div`
  background-color: ${(props) => getStatusColor(props.status)};
  color: black;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid black;
  width: 300px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  margin: 0 0 10px;
  font-size: 20px;
`;

const ProductInfo = styled.p`
  margin: 8px 0;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  background-color: transparent;
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  align-self: flex-start;
`;

const ActionContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  width:90px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.edit ? 'white' : '#d9534f')};
  color: black;

  &:hover {
    opacity: 0.8;
  }
`;

const ProductCard = ({ product }) => {
  return (
    <Card status={product.status}>
      <div>
        <ProductName>{product.name}</ProductName>
        <ProductInfo><strong>Category:</strong> {product.category}</ProductInfo>
        <ProductInfo><strong> ⚠️ Expiry:</strong> {product.expiryDate}</ProductInfo>
        <ProductInfo><strong> 📦 Quantity:</strong> {product.quantity}</ProductInfo>
        <StatusBadge>{product.status}</StatusBadge>
      </div>
      <ActionContainer>
        <ActionButton edit>Edit</ActionButton>
        <ActionButton>Delete</ActionButton>
      </ActionContainer>
    </Card>
  );
};

export default ProductCard;
