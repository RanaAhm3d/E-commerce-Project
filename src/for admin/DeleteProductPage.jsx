import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteProductPage = () => {
  const { productId } = useParams(); // Extract productId from URL parameters
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setError('No product ID provided');
    }
  }, [productId]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${productId}`);

      if (response.status === 200) {
        setSuccess('Product deleted successfully!');
        setTimeout(() => navigate('/'), 2000); 
      } else {
        setError(`Failed to delete product. Status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(`Failed to delete product. Server responded with: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Failed to delete product. Network error. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        setError('Failed to delete product. Please check the console for more details.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Product</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {product ? (
        <div>
          <h3>Are you sure you want to delete the following product?</h3>
          <div className="mb-3">
            <strong>Product Name:</strong> {product.title}
          </div>
          <div className="mb-3">
            <strong>Description:</strong> {product.description}
          </div>
          <div className="mb-3">
            <strong>Price:</strong> ${product.price}
          </div>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeleteProductPage;
