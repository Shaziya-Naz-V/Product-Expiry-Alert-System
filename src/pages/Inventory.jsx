import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styled from 'styled-components';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';

// Styled Components
const InventoryContainer = styled.div`padding: 20px;`;
const FilterContainer = styled.div`display: flex; gap: 15px; margin-bottom: 20px;`;
const Input = styled.input`padding: 8px; flex: 1;`;
const Select = styled.select`padding: 8px;`;
const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
`;
const ProductGrid = styled.div`display: flex; flex-wrap: wrap; gap: 15px;`;
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Fetch all products from backend on mount
  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    if (search.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'All Categories') {
      filtered = filtered.filter(product =>
        product.category === categoryFilter
      );
    }

    if (statusFilter !== 'All Status') {
      filtered = filtered.filter(product =>
        product.status === statusFilter
      );
    }

    setFilteredProducts(filtered);
  }, [search, categoryFilter, statusFilter, products]);

  // Add product handler
  const handleAddProduct = async (newProduct) => {
    try {
      const res = await axios.post('/products', newProduct);
      const updated = [...products, res.data];
      setProducts(updated);
      setShowModal(false);
      setSuccessMessage('Product Added Successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // ✅ Delete product handler
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      const updated = products.filter(p => p._id !== id);
      setProducts(updated);
      setSuccessMessage('Product Deleted Successfully!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <InventoryContainer>
      {successMessage && <Toast>{successMessage}</Toast>}

      <FilterContainer>
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option>All Categories</option>
          <option>Dairy</option>
          <option>Snacks</option>
          <option>Grocery</option>
        </Select>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Safe</option>
          <option>Expiring Soon</option>
          <option>Expired</option>
        </Select>
        <AddButton onClick={() => setShowModal(true)}>+ Add Product</AddButton>
      </FilterContainer>

      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDeleteProduct}
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
