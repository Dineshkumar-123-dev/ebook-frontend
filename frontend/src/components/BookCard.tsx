// src/components/books/BookCard.tsx
import { useCart } from "../context/CartContext";
import type { Book } from "../types/books";
import { motion } from "framer-motion";

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="card glass-card h-100 shadow-lg border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 12px 25px rgba(0,0,0,0.2)" }}
    >
      <div className="card-body d-flex flex-column">
        {/* Book Title */}
        <h5 className="card-title fw-bold gradient-text mb-2">{book.title}</h5>
        <h6 className="text-secondary mb-3">by {book.author}</h6>

        {/* Description */}
        <p className="card-text flex-grow-1 text-dark opacity-85">
          {book.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold gradient-text fs-5">Rs. {book.price}</span>
          <button
            className="btn btn-sm btn-outline-primary px-3"
            onClick={() => addToCart(book)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <style>
        {`
          /* Glass effect card */
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 15px;
            transition: all 0.3s ease;
          }

          /* Gradient text */
          .gradient-text {
            background: linear-gradient(90deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* Card text styling */
          .card-text {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          /* Button hover effect */
          .btn-outline-primary:hover {
            background: linear-gradient(90deg, #667eea, #764ba2);
            color: #fff;
            border-color: transparent;
          }
        `}
      </style>
    </motion.div>
  );
};

export default BookCard;
