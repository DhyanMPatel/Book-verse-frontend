import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function SearchView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  /* -------------------------
     Fetch books
  --------------------------*/
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/books/all");

        const apiBooks = response?.data?.data?.books || [];

        setBooks(apiBooks);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b?.category || "Uncategorized"));

    return ["All", ...Array.from(set)];
  }, [books]);

  /* -------------------------
     Filter books
  --------------------------*/
  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((b) => b?.category === selectedCategory);
    }

    if (query) {
      filtered = filtered.filter((b) =>
        (b?.title || "").toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [books, selectedCategory, query]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* SEARCH BAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
        />
      </motion.div>

      {/* CATEGORY CHIPS */}
      <div className="mb-6">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              component="a"
              href="#basic-chip"
              variant={selectedCategory === cat ? "filled" : "outlined"}
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory(cat);
              }}
            />
          ))}
        </Stack>
      </div>

      {/* LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-500"
          >
            Loading books...
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR */}
      {error && <div className="text-center text-red-500 py-10">{error}</div>}

      {/* BOOK GRID */}
      {!loading && !error && filteredBooks.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {filteredBooks.map((book, index) => {
            const safeKey = book?.id ?? book?._id ?? `${book?.title}-${index}`;

            return (
              <motion.div
                key={safeKey}
                layout
                whileHover={{ scale: 1.05 }}
               onClick={() => handleBookClick(book._id || book.id)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={book?.coverImage}
                    alt={book?.title}
  className="w-full h-48 object-contain bg-gray-50 p-2 transition"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {book?.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-2">{book?.author}</p>

                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {book?.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredBooks.length === 0 && (
        <div className="text-center text-gray-500 py-20">No books found</div>
      )}
    </div>
  );
}
