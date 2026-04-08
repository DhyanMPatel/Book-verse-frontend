import { useEffect, useRef, useState } from 'react';
import HomeView from './homeView';
import axiosInstance from '../../services/axiosInstance';

const HomeContainer = () => {
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
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
    />
  );
};

export default HomeContainer;
