import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 25px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 48%;
  padding: 10px;
  border: none;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? '#6c757d' : '#28a745')};

  &:hover {
    background-color: ${(props) => (props.cancel ? '#5a6268' : '#218838')};
  }
`;

const SuccessMsg = styled.p`
  text-align: center;
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;

const AddProductModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

    const calculateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return 'Expired';
    if (diffDays <= 7) return 'Expiring Soon';
    return 'Safe';
  };

  const handleAdd = async () => {
    const newProduct = {
      name,
      category,
      expiryDate,
      quantity: Number(quantity),
      status: 'Safe',
    };

    try {
     const res = await fetch('https://product-expiry-alert-system-ch0e.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
       const createdProduct = await res.json();
        const productWithStatus = {
          ...createdProduct,
          status: calculateStatus(createdProduct.expiryDate),
        };
        onAdd(productWithStatus);
        setShowSuccess(true);
        setName('');
        setCategory('');
        setExpiryDate('');
        setQuantity('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <ModalBackground>
      <ModalBox>
        <Title>Add Product</Title>

        <Label>Product Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <Label>Category</Label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option>Dairy</option>
          <option>Snacks</option>
          <option>Grocery</option>
        </Select>

        <Label>Expiry Date</Label>
        <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />

        <Label>Quantity</Label>
        <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <ButtonGroup>
          <Button cancel onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </ButtonGroup>

        {showSuccess && <SuccessMsg>Product Added Successfully!</SuccessMsg>}
      </ModalBox>
    </ModalBackground>
  );
};

export default AddProductModal;
