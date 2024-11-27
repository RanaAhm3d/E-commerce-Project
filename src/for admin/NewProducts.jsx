import React, { useState, useEffect } from 'react';
import NewCard from './NewCard';

const PAGE_SIZE = 9; 

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <div className="container mt-4">
      <h2>New Products</h2>
      <div className="row">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div className="col-md-4" key={product.id}>
              <NewCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map(number => (
            <li
              key={number + 1}
              className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewProducts;
