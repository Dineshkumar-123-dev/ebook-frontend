import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axiosInstance from "../api/axiosInstance";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
}

interface BooksContextType {
  books: Book[];
  fetchBooks: () => void;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
