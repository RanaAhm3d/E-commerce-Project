import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Handle item deletion from cart
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id); // Remove item by ID
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  // Calculate total price of products in the cart
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0); // Sum the prices of all items
  };

  return (
    <div className="container mt-4">
      <h1 className="display-5 mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={item.thumbnail} 
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      &times; Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <h4>Total: ${calculateTotal().toFixed(2)}</h4> {/* Display the total price */}
          </div>
        </>
      ) : (
        <p className="text-muted">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
