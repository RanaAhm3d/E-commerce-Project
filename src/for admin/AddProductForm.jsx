
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', image: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const generateUniqueId = () => {
    // You can use a timestamp or another method to ensure the ID is unique
    return Date.now(); // Example: Use timestamp as a unique ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const newProduct = { ...product, id: generateUniqueId() };
      
      
      await axios.post('https://dummyjson.com/products/add', newProduct);
      
      // Store the product in localStorage
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      storedProducts.push(newProduct); 
      localStorage.setItem('products', JSON.stringify(storedProducts));
      
      setSuccessMessage('Product has been added successfully!');
      
      
      setProduct({ name: '', description: '', price: '', image: '' });
      
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mt-4">
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product description"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product image URL"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;


