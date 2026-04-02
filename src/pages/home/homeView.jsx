import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axiosInstance from "../../services/axiosInstance";
import "./homeStyle.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import {
  Book,
  DollarSign,
  Smartphone,
  ChevronsLeft,
  ChevronsRight,
  MoveRight,
} from "lucide-react";

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
  // Get category icon function

  const getCategoryIcon = (category) => {
    const icons = {
      Fiction: "",
      "Non-Fiction": "",
      Science: "",
      Technology: "",
      Business: "",
      History: "",
      Biography: "",
      "Self-Help": "",
      Romance: "",
      Mystery: "",
      Fantasy: "",
      Horror: "",
      Poetry: "",
      Drama: "",
      Adventure: "",
      Children: "",
      Cooking: "",
      Travel: "",
      Art: "",
      Music: "",
    };

    return icons[category] || "";
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

  const filteredBooks = books.filter(
    (book) => book.category === selectedCategory,
  );

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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    // swipeToSlide: true,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading amazing books...</div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h2 className="error-title">Oops! Something went wrong</h2>
        <p className="error-message">{error}</p>
        <button
          className="error-retry-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );

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
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg active:scale-95 cursor-pointer"
                onClick={() => navigate("/search")}
              >
                Explore Books
              </button>
            </div>
          </motion.div>

          {/* HERO VISUAL */}

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

      {/* BOOKS BY CATEGORY - PROFESSIONAL DESIGN */}

      <section className="books-by-category-section">
        <div className="category-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="header-content"
          >
            <div className="header-badge">
              <span className="badge-text">Explore Collection</span>
            </div>

            <h2 className="section-title">
              Books by <span className="title-gradient">Category</span>
            </h2>

            <p className="section-subtitle">
              Discover your next favorite read from our carefully curated
              categories
            </p>
          </motion.div>
        </div>

        {/* CATEGORY TABS */}

        <div className="category-tabs-container">
          <div className="tabs-wrapper">
            <Slider
              {...categorySettings}
              ref={sliderRef2}
              className="category-slider"
            >
              {categories.map((cat, index) => (
                <motion.div
                  key={index}
                  className="category-tab-item"
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
                  >
                    <div className="tab-icon">{getCategoryIcon(cat)}</div>

                    <span className="tab-name">{cat}</span>

                    <div className="tab-indicator"></div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>

        {/* BOOKS GRID WITH ENHANCED DESIGN */}

        <div className="books-showcase">
          <div className="showcase-header">
            <h3 className="category-title">
              {selectedCategory}{" "}
              <span className="book-count">({filteredBooks.length} books)</span>
            </h3>

            <div className="navigation-buttons">
              <button
                onClick={() => sliderRef1.current?.slickPrev()}
                className="nav-btn prev-btn"
              >
                <ChevronsLeft size={20} />
              </button>

              <button
                onClick={() => sliderRef1.current?.slickNext()}
                className="nav-btn next-btn"
              >
                <ChevronsRight size={20} />
              </button>
            </div>
          </div>

          <Slider {...bookSettings} ref={sliderRef1} className="books-slider">
            {filteredBooks.map((book, index) => {
              const discountPercent = book.originalPrice
                ? Math.round(
                    ((book.originalPrice - book.price) / book.originalPrice) *
                      100,
                  )
                : 0;

              const safeKey =
                book._id ||
                book.id ||
                `${book.title}-${Math.random().toString(36).slice(2, 9)}`;

              return (
                <motion.div
                  key={safeKey}
                  className="book-card-container"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div
                    className="premium-book-card"
                    onClick={() => handleDoubleClick(book.id)}
                  >
                    {/* Book Cover with Effects */}

                    <div className="book-cover-container">
                      <motion.img
                        src={
                          book.image ||
                          book.cover ||
                          book.photo ||
                          book.coverImage
                        }
                        alt={book.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="book-cover object-cover"
                      />

                      <div className="cover-overlay">
                        <button className="quick-view-btn">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Quick View
                        </button>
                      </div>

                      {discountPercent > 0 && (
                        <div className="discount-badge">
                          -{discountPercent}%
                        </div>
                      )}
                    </div>

                    {/* Book Details */}

                    <div className="book-details">
                      <div className="book-category-tag">{book.category}</div>

                      <h4 className="book-title">{book.title}</h4>

                      <p className="book-author">by {book.author}</p>

                      <div className="book-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={i < 4 ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>

                        <span className="rating-text">(4.0)</span>
                      </div>

                      <div className="price-section">
                        <div className="price-row">
                          <span className="current-price">₹{book.price}</span>

                          {book.originalPrice && (
                            <span className="original-price">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="add-to-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();

                          // Add to cart logic here
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="9" cy="21" r="1" />

                          <circle cx="20" cy="21" r="1" />

                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Slider>
        </div>

        {/* View All Button */}

        <motion.div
          className="view-all-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            className="view-all-btn"
            onClick={() =>
              navigate(
                `/search?category=${encodeURIComponent(selectedCategory)}`,
              )
            }
          >
            <span className="fill-white">
              View All {selectedCategory} Books
            </span>

            <MoveRight size={20} />
          </button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Why Choose BookVerse
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Reading Journey{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the joy of reading with our carefully curated
              collection and exceptional service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Book,
                title: "Vast Collection",
                description:
                  "Thousands of books across multiple genres and categories",
              },
              {
                icon: DollarSign,
                title: "Best Prices",
                description: "Competitive prices and amazing discounts",
              },
              {
                icon: Smartphone,
                title: "Read Anywhere",
                description: "Access your books on any device anytime",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                 <div className="flex justify-center mb-4">
  <motion.div
    whileHover={{ scale: 1.15, rotate: 8 }}
    whileTap={{ scale: 0.95 }}
    className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 shadow-md group-hover:shadow-xl transition-all duration-300"
  >
    <Icon className="w-8 h-8 text-indigo-600 transition-transform duration-300 group-hover:rotate-10" />
  </motion.div>
</div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* BESTSELLERS SECTION */}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-4">
              Trending Now
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Bestsellers
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what everyone's reading this month
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.slice(0, 8).map((book, index) => (
              <motion.div
                key={book.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handleDoubleClick(book.id)}
              >
                <div className="relative">
                  <img
                    src={
                      book.image || book.cover || book.photo || book.coverImage
                    }
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    HOT
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ₹{book.price}
                    </span>

                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 text-white p-2 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();

                        // Add to cart logic
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="9" cy="21" r="1" />

                        <circle cx="20" cy="21" r="1" />

                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </motion.button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* NEWSLETTER SECTION */}

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with{" "}
              <span className="text-yellow-300">New Arrivals</span>
            </h2>

            <p className="text-xl text-blue-100 mb-8">
              Get exclusive offers and be the first to know about new releases
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomeView;
