import React, { useState, useMemo, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

// Animation variants from library page
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 30,
      mass: 0.8,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
}

export default function SearchView() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlistMap, setWishlistMap] = useState({}); // Track wishlist status
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  // Check if book is in wishlist by fetching full wishlist
  const checkWishlistStatus = async () => {
    try {
      const response = await axiosInstance.get('/wishlist/get');
      const wishlistBooks = response.data?.data?.books || [];
      const wishlistStatus = {};
      wishlistBooks.forEach(book => {
        wishlistStatus[book.id] = true;
      });
      return wishlistStatus;
    } catch {
      return {};
    }
  };

  // Toggle wishlist
  const handleWishlistToggle = async (e, book) => {
    e.stopPropagation();
    
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) {
      toast.error("Please login first");
      return;
    }

    const bookId = book._id || book.id;
    const isInWishlist = wishlistMap[bookId];

    try {
      if (!isInWishlist) {
        await axiosInstance.post("/wishlist/add", { bookId });
        setWishlistMap(prev => ({ ...prev, [bookId]: true }));
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: book.title,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axiosInstance.delete(`/wishlist/remove/${bookId}`);
        setWishlistMap(prev => ({ ...prev, [bookId]: false }));
        Swal.fire({
          icon: "info",
          title: "Removed from Wishlist",
          text: book.title,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist error");
    }
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
        
        // Check wishlist status for all books
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?._id) {
          const wishlistStatus = await checkWishlistStatus();
          setWishlistMap(wishlistStatus);
        }
        
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
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, index) => {
              const safeKey = book?.id ?? book?._id ?? `${book?.title}-${index}`;
              const bookId = book._id || book.id;
              const isInWishlist = wishlistMap[bookId] || false;

              return (
                <motion.div
                  key={safeKey}
                  variants={cardVariants}
                  exit="exit"
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: {
                      type: 'spring',
                      stiffness: 120,
                      damping: 20,
                      mass: 0.5,
                    }
                  }}
                  onClick={() => handleBookClick(bookId)}
                  className="group relative bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow duration-500 ease-out overflow-hidden will-change-transform"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f9fafb)',
                  }}
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/[0.03] group-hover:to-pink-500/[0.05] transition-all duration-700 ease-out rounded-2xl pointer-events-none" />
                  
                  {/* Book Cover */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-inner transition-all duration-500 ease-out">
                    <img
                      src={book?.coverImage}
                      alt={book?.title}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    
                    {/* Category Badge - Always Visible */}
                    <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-purple-700 shadow-sm">
                      {book?.category}
                    </span>

                    {/* Wishlist Button - Show on Hover */}
                    <button
                      onClick={(e) => handleWishlistToggle(e, book)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                        fill={isInWishlist ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* Book Info */}
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300 ease-out">
                    {book?.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    by {book?.author}
                  </p>

                  {/* Price */}
                  {(() => {
                    const price = book?.price || 0;
                    const discount = book?.discount || 0;
                    const discountedPrice = price - (price * discount) / 100;
                    return (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-green-600">
                            ₹{Math.round(discountedPrice)}
                          </span>
                          {discount > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{price}
                            </span>
                          )}
                        </div>
                        {discount > 0 && (
                          <span className="text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredBooks.length === 0 && (
        <div className="text-center text-gray-500 py-20">No books found</div>
      )}
    </div>
  );
}
