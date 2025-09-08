import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axiosInstance from "../api/axiosInstance";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const token = localStorage.getItem("token");

  const handleCheckout = async () => {
    if (!token) {
      alert("Please login to place an order!");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map((c) => ({ book_id: c.id, quantity: c.quantity })),
      };

      await axiosInstance.post("/orders/", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Order placed successfully!");
      clearCart();
    } catch (err: any) {
      console.error("Checkout failed:", err.response || err.message);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      } else if (err.response?.status === 400) {
        alert("Invalid request! Check your cart items.");
      } else {
        alert("❌ Failed to place order. Server error or network issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return (
      <div className="container text-center py-5">
        <h3 className="text-secondary">Your cart is empty 🛒</h3>
      </div>
    );

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-dark fw-bold">🛒 Your Cart</h2>

      <div className="row g-3">
        {cart.map((item) => (
          <div key={item.id} className="col-12">
            <div className="card shadow-sm p-3 d-flex flex-row align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="mb-1 text-secondary">by {item.author}</p>
                <small className="text-muted">Rs. {item.price.toFixed(2)} each</small>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                <span className="mx-2 fw-bold">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-end me-3">
                <h6 className="mb-1 fw-bold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </h6>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-lg mt-4 p-4 text-end">
        <h4 className="fw-bold">Total: Rs. {total.toFixed(2)}</h4>
        <button
          className="btn btn-success btn-lg mt-2"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Processing..." : "Checkout ✅"}
        </button>
        <button
          className="btn btn-outline-danger btn-lg mt-2 ms-3"
          onClick={clearCart}
          disabled={loading}
        >
          Clear Cart 🗑️
        </button>
      </div>
    </div>
  );
};

export default CartPage;
