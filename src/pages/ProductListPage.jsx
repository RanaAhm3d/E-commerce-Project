import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const PAGE_SIZE = 9; // Number of products per page

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to 'all' or a specific category

  const categories = ['smartphones', 'laptops', 'fragrances', 'beauty', 'groceries', 'home-decoration',
    'kitchen-accessories', "mens-shirts", "mens-shoes", "mens-watches",
    "mobile-accessories", "motorcycle", "skin-care", "sports-accessories",
    "sunglasses", "tablets", "tops", "vehicle", "womens-bags",
    "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"]; // Example categories

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint =
          selectedCategory === 'all'
            ? 'https://dummyjson.com/products'
            : `https://dummyjson.com/products/category/${selectedCategory}`;

        const response = await axios.get(endpoint, {
          params: {
            limit: PAGE_SIZE,
            skip: (currentPage - 1) * PAGE_SIZE
          }
        });

        setProducts(response.data.products);
        setTotalProducts(response.data.total); // Assuming the API returns the total count
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Check Our Products</h2>
        <div>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to the first page when changing category
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      {/* Paginatio */}
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
              <button className="page-link" onClick={() => setCurrentPage(number + 1)}>
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
    </div>
  );
};

export default ProductListPage;
