import React from "react";
import { motion } from "framer-motion";
import BookList from "../components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";

const Books: React.FC = () => {
  return (
    <main className="bg-light min-vh-100 d-flex flex-column">
      {/* PAGE HERO */}
      <section className="container-fluid text-center py-5" style={{ background: 'linear-gradient(135deg, #e0f7fa, #ffffff)' }}>
        <motion.h1
          className="display-4 fw-bold mb-3 gradient-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📚 Explore Our Collection
        </motion.h1>
        <motion.p
          className="lead text-secondary col-lg-6 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Dive into our curated library of bestsellers, timeless classics, and hidden gems. Find your next favorite read today!
        </motion.p>
      </section>

      {/* BOOK LIST SECTION */}
      <section className="container-fluid my-5 px-5 flex-grow-1">
        <div className="card glass-card border-0 shadow-lg">
          <div className="card-body">
            <motion.h2
              className="mb-4 gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Available Books
            </motion.h2>
            <BookList />
          </div>
        </div>
      </section>

      <style>
        {`
          /* Glass Card for Book List */
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 20px;
          }

          /* Gradient text */
          .gradient-text {
            background: linear-gradient(90deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* Card body text */
          .card-body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          /* Optional: Add subtle hover effect to book items if BookList supports cards */
          .book-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }
        `}
      </style>
    </main>
  );
};

export default Books;
