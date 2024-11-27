import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '1rem' }}>
      <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text"><strong>Price: </strong>${product.price}</p>
        <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
