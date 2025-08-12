import React from 'react';
import styled from 'styled-components';
import axios from '../api/axios';

const getStatusColor = (status) => {
  if (status === 'Expired') return '#f18e85ff';
  if (status === 'Expiring Soon') return '#f3d6aaff';
  return '#adeeafff';
};

const Card = styled.div`
  background-color: ${(props) => getStatusColor(props.status)};
  padding: 25px;
  border-radius: 12px;
  border: 2px solid black;
  width: 300px;
`;

const ProductName = styled.h3`
  margin: 0 0 10px;
`;

const ProductInfo = styled.p`
  margin: 8px 0;
`;

const StatusBadge = styled.span`
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const ActionContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  width: 90px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = () => {
    onDelete(product._id);
  };

  return (
    <Card status={product.status}>
      <ProductName>{product.name}</ProductName>
      <ProductInfo><strong>Category:</strong> {product.category}</ProductInfo>
      <ProductInfo><strong>Expiry:</strong> {product.expiryDate}</ProductInfo>
      <ProductInfo><strong>Quantity:</strong> {product.quantity}</ProductInfo>
      <StatusBadge>{product.status}</StatusBadge>

      <ActionContainer>
        <ActionButton onClick={handleDelete}>Delete</ActionButton>
      </ActionContainer>
    </Card>
  );
};

export default ProductCard;
