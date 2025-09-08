import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { cart } = useCart(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light px-4 shadow-sm glass-navbar">
      <Link className="navbar-brand fw-bold" to="/">BookNest</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          {!token ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          ) : (
            <>
              {role === "user" && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/user">User Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
                  <li className="nav-item position-relative">
                    <Link className="nav-link" to="/cart">
                      🛒 Cart
                      {cart.length > 0 && (
                        <span className="badge bg-gradient-cart position-absolute top-0 start-100 translate-middle">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}

              {role === "admin" && (
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin Dashboard</Link></li>
              )}

              {role === "superadmin" && (
                <li className="nav-item"><Link className="nav-link" to="/superadmin">SuperAdmin Dashboard</Link></li>
              )}

              <li className="nav-item">
                <button className="btn btn-gradient-logout ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Custom styles */}
      <style>
        {`
          .glass-navbar {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 12px;
          }

          .navbar-brand {
            background: linear-gradient(90deg, #fae2e2ff, #686868ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 1.5rem;
          }

          .nav-link {
            color: #333 !important;
            font-weight: 500;
            transition: color 0.3s, transform 0.2s;
          }

          .nav-link:hover {
            color: #ff0d72ff !important;
            transform: translateY(-2px);
          }

          .btn-gradient-logout {
            background: linear-gradient(90deg, #ffffffff, #707070ff);
            color: #fff;
            font-weight: 600;
            border: none;
            transition: transform 0.3s, opacity 0.3s;
          }
          .btn-gradient-logout:hover {
            transform: translateY(-2px);
            opacity: 0.9;
          }

          .badge.bg-gradient-cart {
            background: linear-gradient(135deg, #4ade80, #22c55e);
            color: #fff;
            font-weight: bold;
            font-size: 0.75rem;
            padding: 0.25em 0.5em;
            border-radius: 50%;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
