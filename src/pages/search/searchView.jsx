import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchView() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  /* -------------------------
     Fetch books from backend
  --------------------------*/
  useEffect(() => {

    const fetchBooks = async () => {

      try {

        setLoading(true);

        const response = await axiosInstance.get("/books/all");

        console.log(response.data);

        const apiBooks = response?.data?.data?.books || [];

        setBooks(apiBooks);

        setError(null);

      } catch (err) {

        console.error("Error fetching books:", err);

        setError("Failed to load books");

      } finally {

        setLoading(false);

      }
    };

    fetchBooks();

  }, []);


  /* -------------------------
     Extract categories
  --------------------------*/
  const categories = useMemo(() => {

    const set = new Set(
      books.map((b) => b?.category || "Uncategorized")
    );

    return ["All", ...Array.from(set)];

  }, [books]);


  /* -------------------------
     Filter books
  --------------------------*/
  const filteredBooks = useMemo(() => {

    let filtered = books;

    if (selectedCategory && selectedCategory !== "All") {

      filtered = filtered.filter(
        (b) => b?.category === selectedCategory
      );

    }

    if (query) {

      filtered = filtered.filter((b) =>
        (b?.title || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      );

    }

    return filtered;

  }, [books, selectedCategory, query]);


  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-60 bg-slate-900 text-white p-6 overflow-y-auto">

        <h2 className="text-xl font-bold mb-6">
          Categories
        </h2>

        <div className="flex flex-col gap-2">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-4 py-2 rounded-lg transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                  : "hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>

          ))}

        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

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
        {error && (
          <div className="text-center text-red-500 py-10">
            {error}
          </div>
        )}


        {/* BOOK GRID */}
        {!loading && !error && filteredBooks.length > 0 && (

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >

            {filteredBooks.map((book, index) => {

              const safeKey =
                book?.id ??
                book?._id ??
                `${book?.title}-${index}`;

              return (

                <motion.div
                  key={safeKey}
                  layout
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >

                  <div className="overflow-hidden">

                    <img
                      src={book?.cover}
                      alt={book?.title}
                      className="w-full h-48 object-cover hover:scale-110 transition"
                    />

                  </div>

                  <div className="p-4">

                    <h3 className="font-semibold text-lg line-clamp-2">
                      {book?.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      {book?.author}
                    </p>

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

          <div className="text-center text-gray-500 py-20">
            No books found
          </div>

        )}

      </div>
    </div>
  );
} 