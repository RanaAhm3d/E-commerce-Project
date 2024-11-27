import React, { useEffect, useState } from 'react';

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUpdates = () => {
      const storedUpdates = JSON.parse(localStorage.getItem('productUpdates')) || [];
      setUpdates(storedUpdates);
    };

    fetchUpdates();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(updates.length / itemsPerPage);

  // Paginate items
  const currentItems = updates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddToCart = (product) => {
    //cart here
    setSuccessMessage(`${product.title} added to cart!`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="container mt-4">
      <h2>Product Updates</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {currentItems.length > 0 ? (
        <>
          <div className="row">
            {currentItems.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={product.thumbnail} alt={product.title} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">Brand: {product.brand}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
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
                  onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <p>No updates found.</p>
      )}
    </div>
  );
};

export default UpdatesPage;

