import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProductForm = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState({ title: '', description: '', price: '', thumbnail: '', category: '', brand: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      
      let updates = JSON.parse(localStorage.getItem('productUpdates')) || [];
      updates = updates.filter((p) => p.id !== productId); 
      updates.push({ ...product, id: productId }); 
      localStorage.setItem('productUpdates', JSON.stringify(updates));
      
      alert('Product updated successfully!');
      navigate('/updates'); 
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Product Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
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
          <label htmlFor="thumbnail" className="form-label">Product Image URL</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={product.thumbnail}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product image URL"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product category"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product brand"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductForm;
