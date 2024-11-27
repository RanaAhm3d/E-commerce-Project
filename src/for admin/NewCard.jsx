import React from 'react';
import { Link } from 'react-router-dom';

const NewCard = ({ product }) => {
  return (
    <div className="card mb-4" style={{ width: '18rem' }}>
      <img src={product.image || 'https://via.placeholder.com/150'} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default NewCard;
