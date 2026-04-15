import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import HomeView from './homeView';
import axiosInstance from '../../services/axiosInstance';

const HomeContainer = () => {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/books/all');
        const apiBooks = response?.data?.data?.books || [];
        setBooks(apiBooks);

        const uniqueCategories = [
          ...new Set(apiBooks.map((book) => book.category || 'Uncategorized')),
        ];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    // Fetch active coupons
    const fetchCoupons = async () => {
      setCouponLoading(true);
      try {
        const response = await axiosInstance.get('/coupons/list');
        console.log('Coupons API response:', response.data);
        const allCoupons = response?.data?.data?.coupons || [];
        console.log('All coupons:', allCoupons);

        // Filter active coupons (not expired, has usage left)
        const now = new Date();
        const activeCoupons = allCoupons.filter(coupon => {
          const validDate = new Date(coupon.validTillDate);
          const hasUsageLeft = !coupon.usageLimit || coupon.timesUsed < coupon.usageLimit;
          return validDate > now && hasUsageLeft;
        });

        console.log('Filtered active coupons:', activeCoupons);
        setCoupons(activeCoupons.slice(0, 3)); // Show max 3 coupons
      } catch (err) {
        console.error('Failed to fetch coupons:', err);
        console.log('Error response:', err.response);
        setCoupons([]);
      } finally {
        setCouponLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // Filter books by category
  const filteredBooks = books.filter(
    (book) => book.category === selectedCategory,
  );

  // Book slider settings
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

  // Category slider settings
  const categorySettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  // Feature cards data
  const features = [
    {
      title: 'Vast Collection',
      description: 'Thousands of books across multiple genres and categories',
    },
    {
      title: 'Best Prices',
      description: 'Competitive prices and amazing discounts',
    },
    {
      title: 'Read Anywhere',
      description: 'Access your books on any device anytime',
    },
  ];

  // Add to cart handler
// In HomeContainer.jsx — replace handleAddToCart
const handleAddToCart = async (book) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?._id) {
    toast.error('Please login first');
    return;
  }

  try {
    // 🔹 Check if book already in cart
    const cartRes = await axiosInstance.get('/cart/get');
    const cartItems = cartRes.data?.data?.items || [];
    const alreadyInCart = cartItems.some(
      (item) => item.bookId.toString() === (book._id || book.id).toString()
    );

    if (alreadyInCart) {
      const result = await Swal.fire({
        icon: 'info',
        title: 'Already in Cart',
        text: `"${book.title}" is already in your cart.`,
        showCancelButton: true,
        confirmButtonText: 'Go to Cart',
        cancelButtonText: 'Continue Shopping',
      });
      if (result.isConfirmed) window.location.href = '/cart';
      return; // ✅ stop here
    }

    // 🔹 Not in cart — add it
    await axiosInstance.post('/cart/add', {
      bookId: book._id || book.id,
      quantity: 1,
    });

    const result = await Swal.fire({
      icon: 'success',
      title: 'Added to Cart 🛒',
      text: `${book.title} added successfully!`,
      showCancelButton: true,
      confirmButtonText: 'Go to Cart',
      cancelButtonText: 'Continue Shopping',
    });

    if (result.isConfirmed) window.location.href = '/cart';

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || 'Failed to add to cart',
    });
  }
};

  // const handleAddToCart = async (book) => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (!user?._id) {
  //     toast.error('Please login first');
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       bookId: book._id || book.id,
  //       quantity: 1,
  //     };
  //     await axiosInstance.post('/cart/add', payload);

  //     const result = await Swal.fire({
  //       icon: 'success',
  //       title: 'Added to Cart',
  //       text: `${book.title} added successfully!`,
  //       showCancelButton: true,
  //       confirmButtonText: 'Go to Cart',
  //       cancelButtonText: 'Continue Shopping',
  //     });

  //     if (result.isConfirmed) {
  //       window.location.href = '/cart';
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: error.response?.data?.message || 'Failed to add to cart',
  //     });
  //   }
  // };

  return (
    <HomeView
      sliderRef1={sliderRef1}
      sliderRef2={sliderRef2}
      books={books}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      loading={loading}
      error={error}
      filteredBooks={filteredBooks}
      bookSettings={bookSettings}
      categorySettings={categorySettings}
      features={features}
      handleAddToCart={handleAddToCart}
      coupons={coupons}
      couponLoading={couponLoading}
    />
  );
};

export default HomeContainer;
