// import { createContext, useContext, useEffect, useState } from "react";
// import axiosInstance from "../services/axiosInstance";

// const BooksContext = createContext();

// export const BooksProvider = ({ children }) => {
//   const [books, setBooks] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);

//       const response = await axiosInstance.get("/books/all");

//       const apiBooks = response?.data?.data?.books || [];

//       setBooks(apiBooks);

//       const uniqueCategories = [
//         ...new Set(apiBooks.map((book) => book.category || "Uncategorized")),
//       ];

//       setCategories(uniqueCategories);

//       if (uniqueCategories.length > 0) {
//         setSelectedCategory(uniqueCategories[0]);
//       }

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <BooksContext.Provider
//       value={{
//         books,
//         categories,
//         selectedCategory,
//         setSelectedCategory,
//         loading,
//         error,
//         fetchBooks,
//       }}
//     >
//       {children}
//     </BooksContext.Provider>
//   );
// };

// export const useBooks = () => {
//   return useContext(BooksContext);
// };