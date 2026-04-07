import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reviews from "../../components/Review";
import { useBooks } from "../../contexts/BookContext";
import { useReviews } from "../../contexts/ReviewContext";
import Swal from "sweetalert2";
import { Heart } from "lucide-react";

export default function BookDetailView(props) {
   const {handlePayment, isProcessing, handleClickWishlist, liked} = props;
  // const { handlePayment, isProcessing, handleClickWishlist, liked } = props;
  //  const [liked, setLiked] = useState(false);
  const [book, setBook] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const bookDetails = {
    Author: book?.author,
    Publisher: book?.publisher,
    Pages: book?.pages,
    Language: book?.language,
    ISBN: book?.isbn,
    "Publication Date": book?.publishedDate,
    Genre: book?.category,
  };

  const reviewCount = reviews?.length || 0;

  const avgRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviewCount
        ).toFixed(1)
      : 0;

  const addToCart = async () => {
    // Add to cart logic here
    // console.log("Added to cart:", book.title, "Quantity:", quantity);
  try {
    const payload = {
      bookId: book._id || book.id,
      quantity: quantity,
    };
    // await axiosInstance.put("/cart/update", payload);
    const response = await axiosInstance.post("/cart/add", payload);

    console.log("Cart response:", response.data);

    // ✅ SweetAlert here
   await Swal.fire({
  icon: "success",
  title: "Added to Cart 🛒",
  text: `${book.title} added successfully!`,
  showCancelButton: true,
  confirmButtonText: "Go to Cart",
  cancelButtonText: "Continue Shopping",
}).then((result) => {
  if (result.isConfirmed) {
    navigate("/cart");
  } else if (result.isDismissed) {
    navigate("/search"); // 👈 change "/search" to your actual search page route
  }
});

  } catch (error) {
    console.error("Error adding to cart:", error);

    // ❌ Error SweetAlert
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to add book to cart ❌",
    });
  }
};

  // const buyNow = () => {
  //   // Buy now logic here
  //   console.log("Buy now:", book.title, "Quantity:", quantity);
  // };

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
            
<div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 flex justify-center">
  <div className="relative w-[260px] sm:w-[300px] lg:w-[320px] h-[380px] sm:h-[420px] lg:h-[460px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
    
    <motion.img
      src={book.coverImage}
      alt={book.title}
      className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    />

    {/* Wishlist Button */}
    

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
        
        
        {/* wishlist button */}
           <div>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
onClick={() => handleClickWishlist(book)}    
    className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md sm:shadow-lg cursor-pointer flex items-center justify-center"
      >
        <Heart
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
            liked ? "fill-red-500 text-red-500 scale-110" : "text-red-500"
          }`}
        />
      </motion.button>
    </div>
        
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
                {/* Calculate discounted price */}
                {book.discount ? (
                  <span className="text-3xl sm:text-4xl font-bold text-green-600">
                    ₹
                    {(book.price - (book.price * book.discount) / 100).toFixed(
                      2,
                    )}
                  </span>
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold text-green-600">
                    ₹{book.price}
                  </span>
                )}

                {/* Old price */}
                {book.discount && (
                  <span className="text-xl sm:text-2xl text-gray-400 line-through">
                    ₹{book.price}
                  </span>
                )}

                {/* Discount badge */}
                {book.discount && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    {book.discount}% OFF
                  </motion.span>
                )}
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
                  onClick={() => {
                    const amountInRupees = book.discount
                      ? (book.price - (book.price * book.discount) / 100) * quantity
                      : book.price * quantity;
                    handlePayment(
                      amountInRupees * 100, // Convert to paise
                      [
                        {
                          bookId: book._id || book.id,
                          quantity: quantity,
                          title: book.title,
                          author: book.author,
                          price: book.price,
                          discount: book.discount || 0,
                          coverImage: book.coverImage || book.image,
                        },
                      ]
                    );
                  }}
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
  className="bg-white rounded-3xl shadow-xl p-4 lg:p-6"  // reduced padding
>
  <h3 className="text-xl lg:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Book Details
  </h3>

  <div className="space-y-2"> {/* reduced spacing */}
    {Object.entries(bookDetails || {}).map(
      ([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.05 }}
          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0" // reduced py
        >
          <span className="font-semibold text-gray-700 capitalize text-sm lg:text-base">
            {key}
          </span>
          <span className="text-gray-600 font-medium text-sm lg:text-base">
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

       
      </div>
    </div>
  );
}
