import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  // Helper to get full image URL
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Get base URL from axios instance (remove /api if present)
    const baseURL = import.meta.env.VITE_NODE_ENV === "production" 
      ? import.meta.env.VITE_LIVE_API_URL?.replace('/api', '') 
      : import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    // Ensure no double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseURL}${cleanPath}`;
  };

  // ✅ Fetch wishlist from backend (now returns populated book data with coverImage)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/wishlist/get");
        // Backend returns { books: [{ id, title, author, price, coverImage }] }
        const books = res.data?.data?.books || [];

        // Map backend format to frontend format
        const formattedBooks = books.map(item => ({
          bookId: {
            _id: item.id,
            title: item.title,
            author: item.author,
            price: item.price,
            coverImage: item.coverImage
          }
        }));

        setWishlistBooks(formattedBooks);
        console.log("Fetched wishlist with images:", formattedBooks);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Remove from wishlist — all books come pre-liked
  const handleRemove = async (bookId, bookTitle) => {
    const result = await Swal.fire({
      title: "Remove from Wishlist?",
      text: `"${bookTitle}" will be removed from your wishlist.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
    });

    if (!result.isConfirmed) return;

    try {
      setRemovingId(bookId);
      await axiosInstance.delete(`/wishlist/remove/${bookId}`);

      // Remove from local state immediately
      setWishlistBooks((prev) =>
        prev.filter((item) => {
          const id = item.bookId?._id || item.bookId;
          return id?.toString() !== bookId;
        })
      );

      toast.success(`"${bookTitle}" removed from wishlist`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to remove");
    } finally {
      setRemovingId(null);
    }
  };

  // ✅ Clear entire wishlist
  const handleClearWishlist = async () => {
    const result = await Swal.fire({
      title: "Clear Entire Wishlist?",
      text: "All books will be removed from your wishlist. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear all",
    });

    if (!result.isConfirmed) return;

    try {
      setClearing(true);
      await axiosInstance.delete("/wishlist/clear");
      setWishlistBooks([]);
      toast.success("Wishlist cleared successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to clear wishlist");
    } finally {
      setClearing(false);
    }
  };

  // ─── Loading Skeleton ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          My Wishlist
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-4 animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
              <div className="h-3 bg-gray-200 rounded mb-3 w-1/2" />
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-8 w-8 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Empty State ────────────────────────────────────────────────────
  if (wishlistBooks.length === 0) {
    return (
      <motion.div
        key="wishlist"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          My Wishlist
        </h2>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Browse books and click the heart to save them here.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/search"}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <BookOpen className="w-5 h-5" />
            Explore Books to Wishlist
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ─── Wishlist Grid ──────────────────────────────────────────────────
  return (
    <motion.div
      key="wishlist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Wishlist
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {wishlistBooks.length} {wishlistBooks.length === 1 ? "book" : "books"}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearWishlist}
            disabled={clearing}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 text-sm font-medium px-4 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            {clearing ? "Clearing..." : "Clear All"}
          </motion.button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlistBooks.map((item, index) => {
            const book = item.bookId;
            const bookId = book?._id;
            const title = book?.title || "Unknown Title";
            const author = book?.author || "Unknown Author";
            const price = book?.price || 0;
            const discount = book?.discount || 0;
            const coverImage = getFullImageUrl(book?.coverImage);
            const discountedPrice = price - (price * discount) / 100;
            const isRemoving = removingId === bookId?.toString();

            return (
              <motion.div
                key={bookId?.toString() || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => navigate(`/book/${bookId}`)}
                className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow relative cursor-pointer"
              >
                {/* Cover Image */}
                <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full items-center justify-center"
                    style={{ display: coverImage ? "none" : "flex" }}
                  >
                    <BookOpen className="w-12 h-12 text-blue-400" />
                  </div>
                </div>

                {/* Book Info */}
                <h3 className="font-semibold text-gray-800 mb-1 truncate">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 truncate">{author}</p>

                {/* Price + Remove Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      ₹{Math.round(discountedPrice)}
                    </p>
                    {discount > 0 && (
                      <p className="text-xs text-gray-400 line-through">
                        ₹{price}
                      </p>
                    )}
                  </div>

                  {/* ✅ Heart button — always filled, click to remove */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(bookId?.toString(), title);
                    }}
                    disabled={isRemoving}
                    className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md cursor-pointer flex items-center justify-center disabled:opacity-50 z-10"
                    title="Remove from wishlist"
                  >
                    <motion.div
                      animate={isRemoving ? { scale: [1, 0.8, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500 transition-all duration-300" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discount}% OFF
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Wishlist;