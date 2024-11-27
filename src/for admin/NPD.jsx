import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NPD = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState(''); 

  useEffect(() => {
    
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find(p => p.id === parseInt(id, 10));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const AddToCart = () => {
    // Logic to add the product to the cart could go here
    setCartMessage(`${product.name} has been added to your cart!`);
    setTimeout(() => setCartMessage(''), 3000); 
  };

  return (
    <div className="container mt-4">
      {cartMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {cartMessage}
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p className="h4">Price: ${product.price}</p>
          <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => AddToCart()}
            >
              Add To Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default NPD;
