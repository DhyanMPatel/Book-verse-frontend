import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reviews from "../../components/Review";
import { useBooks } from "../../contexts/BookContext";
import { useReviews } from "../../contexts/ReviewContext";

export default function BookDetailView() {
  const [book, setBook] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchReviews, reviews } = useReviews();

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/books/details/${id}`);
        if (id) {
          fetchReviews(id);
        }
        console.log("response from the books details");
        const bookData = response?.data?.data?.bookDetailData;
        setBook(bookData);
        setError(null);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Fetch related books from same category
  // if (bookData?.category) {
  //   try {
  //     const relatedResponse = await axiosInstance.get(`/books/category/${bookData.category}`);
  //     const related = relatedResponse?.data?.data?.books || [];
  //     // Filter out the current book and limit to 8 books
  //     const filteredRelated = related
  //       .filter(b => b.id !== bookData.id)
  //       .slice(0, 8);
  //     setRelatedBooks(filteredRelated);
  //   } catch (err) {
  //     console.log("Error fetching related books:", err);
  //   }
  // }

  const bookDetails = {
    Author: book?.author,
    Publisher: book?.publisher,
    Pages: book?.pages,
    Language: book?.language,
    ISBN: book?.isbn,
    "Publication Date": book?.publicationDate,
    Genre: book?.genre,
  };

  const reviewCount = reviews?.length || 0;

  const avgRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviewCount
        ).toFixed(1)
      : 0;

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryResult("✅ Delivery available in 3-5 days");
    } else if (pincode.length > 0) {
      setDeliveryResult("❌ Please enter a valid 6-digit pincode");
    } else {
      setDeliveryResult("");
    }
  };

  const addToCart = () => {
    // Add to cart logic here
    console.log("Added to cart:", book.title, "Quantity:", quantity);
  };

  const buyNow = () => {
    // Buy now logic here
    console.log("Buy now:", book.title, "Quantity:", quantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center"
        >
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-red-500 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 sm:p-6 lg:p-8"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back to Books</span>
        </motion.button>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* MAIN CONTENT GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <motion.img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-[400px] sm:h-[450px] lg:h-[500px] object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute top-4 right-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            {book.images && book.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4 overflow-x-auto pb-2"
              >
                {book.images.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Book view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* BOOK INFO SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Author */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
              >
                {book.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 mb-4"
              >
                by{" "}
                <span className="font-medium text-gray-800">{book.author}</span>
              </motion.p>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg
                      key={star}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + star * 0.1 }}
                      className="w-5 h-5"
                      fill={
                        star <= Math.round(avgRating) ? "currentColor" : "none"
                      }
                      stroke="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                <span className="text-gray-700 font-semibold">
                  {avgRating} / 5
                </span>

                <span className="text-gray-600 font-medium">
                  ({reviewCount} reviews)
                </span>
              </motion.div>

              {/* Price Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <span className="text-3xl sm:text-4xl font-bold text-green-600">
                  ₹{book.price}
                </span>

                {book.oldPrice && (
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">
                    ₹{book.oldPrice}
                  </span>
                )}

                {book.discount && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    {book.discount}% OFF
                  </motion.span>
                )}
              </motion.div>

              {/* Stock Status */}
              {book.stock && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 font-semibold">
                    In Stock - Ready to ship
                  </span>
                </motion.div>
              )}

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 flex items-center justify-center"
                  >
                    -
                  </motion.button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 flex items-center justify-center"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={buyNow}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Buy Now
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Book Details Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white rounded-3xl shadow-xl p-6 lg:p-8"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Book Details
              </h3>

              <div className="space-y-4">
                {Object.entries(bookDetails || {}).map(
                  ([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.05 }}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-semibold text-gray-700 capitalize">
                        {key}
                      </span>
                      <span className="text-gray-600 font-medium">
                        {value || "N/A"}
                      </span>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* DESCRIPTION SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 lg:mt-12"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Description
            </h2>

            <AnimatePresence>
              <motion.div
                key={expanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: expanded ? "auto" : "120px" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`${expanded ? "" : "overflow-hidden"}`}
              >
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {book.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* REVIEWS SECTION */}
        <Reviews bookId={id} />

        {/* RELATED BOOKS */}
        {relatedBooks && relatedBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-8 lg:mt-12"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  More from {book?.category}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/search?category=${book?.category}`)}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  View All →
                </motion.button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedBooks.map((relatedBook, index) => (
                  <motion.div
                    key={relatedBook.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/books/${relatedBook.id}`)}
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden rounded-xl mb-3">
                        <motion.img
                          src={relatedBook.image || relatedBook.cover}
                          alt={relatedBook.title}
                          className="w-full h-40 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        {relatedBook.discount && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {relatedBook.discount}% OFF
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedBook.title}
                      </h3>

                      <p className="text-xs text-gray-600 mb-2">
                        by {relatedBook.author}
                      </p>

                      <div className="flex items-center justify-center gap-1 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({relatedBook.reviewsCount || 0})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-green-600">
                          ₹{relatedBook.price}
                        </p>
                        {relatedBook.oldPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{relatedBook.oldPrice}
                          </p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Added to cart:", relatedBook.title);
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* OFFERS SECTION */}
        {book.offers && book.offers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-8 lg:mt-12"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Special Offers
              </h2>

              <div className="grid gap-4">
                {book.offers.map((offer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-2xl flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{offer}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* DELIVERY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="mt-8 lg:mt-12"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Check Delivery
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <motion.input
                type="text"
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              />

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkDelivery}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Check Availability
              </motion.button>
            </div>

            <AnimatePresence>
              {deliveryResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-2xl ${
                    deliveryResult.includes("✅")
                      ? "bg-green-50 border-2 border-green-200 text-green-700"
                      : "bg-red-50 border-2 border-red-200 text-red-700"
                  }`}
                >
                  {deliveryResult}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
