import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styled from 'styled-components';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';

const InventoryContainer = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  flex: 1;
`;

const Select = styled.select`
  padding: 8px;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Toast = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Inventory = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('/products').then(res => setProducts(res.data));
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    setShowModal(false);
    setSuccessMessage('Product Added Successfully!');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p._id === updatedProduct._id ? updatedProduct : p));
  };

  return (
    <InventoryContainer>
      {successMessage && <Toast>{successMessage}</Toast>}

      <FilterContainer>
        <Input type="text" placeholder="Search products..." />
        <Select>
          <option>All Categories</option>
          <option>Dairy</option>
          <option>Snacks</option>
          <option>Grocery</option>
        </Select>
        <Select>
          <option>All Status</option>
          <option>Safe</option>
          <option>Expiring Soon</option>
          <option>Expired</option>
        </Select>
        <AddButton onClick={() => setShowModal(true)}>+ Add Product</AddButton>
      </FilterContainer>

      <ProductGrid>
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        ))}
      </ProductGrid>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </InventoryContainer>
  );
};

export default Inventory;