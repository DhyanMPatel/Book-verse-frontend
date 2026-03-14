// context/BooksContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/books/all");
      const res = response?.data?.data?.books || [];
      setBooks(res);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooks,
        loading,
        fetchBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BooksContext);
};