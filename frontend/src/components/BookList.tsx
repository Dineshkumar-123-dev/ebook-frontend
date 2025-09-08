// src/components/BookList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import BookCard from "./BookCard";
import type { Book } from "../types/books";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<Book[]>("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div
      className="container-fluid py-5 min-vh-100"
      style={{ background: "linear-gradient(135deg, #f5f7fa, #e0f7fa)" }}
    >
      <div className="row g-4 justify-content-center">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="text-center text-secondary mt-5">
            <h4>No books available 📚</h4>
          </div>
        )}
      </div>

      <style>
        {`
          /* Hover animation for book cards */
          .col-12.col-sm-6.col-md-4.col-lg-3:hover .card {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          }

          /* Text style for empty state */
          .text-secondary {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          /* Smooth transition for cards */
          .card {
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
};

export default BookList;
