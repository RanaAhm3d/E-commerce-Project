import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // const AddToCart = () => {
  //   // Logic to add the product to the cart could go here
  //   setCartMessage(`${product.title} has been added to your cart!`);
  //   setTimeout(() => setCartMessage(''), 3000); // Remove alert after 3 seconds
  // };
  const handleAddToCart = () => {
    if (product) {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = [...storedCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartMessage(`${product.title} has been added to your cart!`);
      setTimeout(() => setCartMessage(''), 3000);
    }
  };

  return (
    <div className="container mt-4">
      {cartMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {cartMessage}
        </div>
      )}
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img src={product.thumbnail} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1 className="display-4">{product.title}</h1>
            <p className="lead">{product.description}</p>
            <p className="lead">Category: {product.category}</p>
            <p className="lead">Brand: {product.brand}</p>
            <p className="h4">Price: ${product.price}</p>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
