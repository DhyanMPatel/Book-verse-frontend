// // src/views/HomeView.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const HomeView = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* HERO SECTION */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
//       >
//         {/* Background Glow */}
//         <div className="absolute top-[-200px] right-[-200px] w-[450px] h-[450px] bg-blue-300 opacity-20 rounded-full blur-3xl" />
//         <div className="absolute bottom-[-200px] left-[-200px] w-[450px] h-[450px] bg-purple-300 opacity-20 rounded-full blur-3xl" />

//         <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
//           {/* LEFT CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, x: -80 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="text-sm uppercase tracking-[0.25em] text-blue-600 mb-6"
//             >
//               Curated Collection
//             </motion.p>

//             <motion.h1
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
//             >
//               Discover Stories
//               <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Unlock Your Next Adventure
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="text-lg text-gray-600 max-w-md mb-8"
//             >
//               Explore timeless classics, inspiring stories, and modern insights
//               carefully curated for passionate readers.
//             </motion.p>

//             {/* CTA BUTTONS */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="flex flex-wrap gap-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl"
//                 onClick={() => {
//                   // example navigation handler - replace with router navigation if you use react-router / next/link etc.
//                   window.location.href = "/books";
//                 }}
//               >
//                 Explore Books
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"
//                 onClick={() => {
//                   window.location.href = "/categories";
//                 }}
//               >
//                 Browse Categories
//               </motion.button>
//             </motion.div>
//           </motion.div>

//           {/* HERO IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, x: 80 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative flex justify-center"
//           >
//             <motion.img
//               src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
//               alt="Library"
//               className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
//               animate={{ y: [0, -15, 0] }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               whileHover={{ scale: 1.03 }}
//             />
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* (No book cards or book sections here) */}

//       <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
//         <p>© 2026 BookVerse. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomeView;


import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * HomeView
 * - Smaller/compact book cards compared to your original version
 * - Keeps sliders for books and categories (react-slick)
 * - Keeps framer-motion hero animations
 *
 * Notes:
 * - This uses Tailwind utility classes (as in your original). If you don't use Tailwind,
 *   you'll need to convert the classes to your CSS.
 * - If you rely on `line-clamp-2`, ensure Tailwind line-clamp plugin is enabled or replace with CSS truncation.
 */

const HomeView = () => {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Double click function
  const handleDoubleClick = (id) => {
    navigate(`/book/${id}`);
  };

  // FETCH BOOKS
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/books/all");

        const apiBooks = response?.data?.data?.books || [];

        setBooks(apiBooks);

        const uniqueCategories = [
          ...new Set(apiBooks.map((book) => book.category || "Uncategorized")),
        ];

        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // FILTER BOOKS BY CATEGORY
  const filteredBooks = books.filter((book) => book.category === selectedCategory);

  // BOOK SLIDER SETTINGS (kept mostly same; you can increase slidesToShow to show more)
  const bookSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // CATEGORY SLIDER SETTINGS
  const categorySettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        <div className="absolute top-[-200px] right-[-200px] w-[450px] h-[450px] bg-blue-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[450px] h-[450px] bg-purple-300 opacity-20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-blue-600 mb-6">
              Curated Collection
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Discover Stories
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unlock Your Next Adventure
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-md mb-8">
              Explore timeless classics, inspiring stories, and modern insights
              carefully curated for passionate readers.
            </p>

            <div className="flex gap-4">
              <button
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
                onClick={() => (window.location.href = "/books")}
              >
                Explore Books
              </button>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="Library"
              className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* BOOKS BY CATEGORY */}
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Books by Category</h2>

        {/* BOOK SLIDER */}
        <Slider {...bookSettings} ref={sliderRef1}>
          {filteredBooks.map((book) => {
            // <<-- MERGED: percentage calculation placed here as requested
            const discountPercent = book.originalPrice
              ? Math.round(
                  ((book.originalPrice - book.price) / book.originalPrice) * 100
                )
              : 0;

            const safeKey =
              book._id ||
              book.id ||
              `${book.title}-${Math.random().toString(36).slice(2, 9)}`;

            return (
              <div key={safeKey} className="p-3">
                <motion.div
                  onClick={() => handleDoubleClick(book._id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.20 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <motion.img
                    src={book.image || book.cover || book.photo}
                    alt={book.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-48 object-contain p-3"
                  />

                  <div className="px-3 pb-3">
                    {/* Title */}
                    <h3 className="font-semibold text-sm line-clamp-2">{book.title}</h3>

                    {/* Author */}
                    <p className="text-gray-500 text-xs mt-1">{book.author}</p>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-gray-400 line-through text-xs">
                        ₹ {book.originalPrice}
                      </span>

                      <span className="font-bold text-base">₹ {book.price}</span>

                      {/* Animated Discount Badge */}
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-md font-semibold"
                      >
                        {discountPercent}% OFF
                      </motion.span>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-2"
                    >
                      🛍 Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </Slider>

        {/* CATEGORY SLIDER */}
        <div className="mt-10">
          <Slider {...categorySettings} ref={sliderRef2}>
            {categories.map((cat, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
              >
                <div
                  className={`p-3 rounded-lg text-center font-medium transition ${
                    selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {cat}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
        <p>© 2026 BookVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeView;