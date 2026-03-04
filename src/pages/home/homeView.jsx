import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";

const HomeView = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get("/books/all");

    console.log(response.data); // check API response

    setBooks(response.data.data.books);

  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

  const featuredBooks = books.filter((book) => book.featured);
  const discountedBooks = books.filter((book) => book.discount > 0);
  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="w-full min-h-[90vh] flex items-center">
        <div className="grid md:grid-cols-2 w-full">
          <div className="flex flex-col justify-center px-8 md:px-20 py-20">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
              Curated Collection
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-900 mb-8">
              Discover Stories <br /> That Stay With You
            </h1>

            <p className="text-lg text-gray-600 max-w-md mb-10">
              A refined collection of timeless literature, modern thinking, and
              inspiring reads for every kind of reader.
            </p>

            <button className="border text-gray-200 border-gray-500 px-9 py-3 text-sm tracking-wider hover:bg-gray-300 hover:text-white transition duration-300 w-fit active:scale-95"> Explore Books </button>
          </div>

          <div className="relative h-[500px] md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="Library Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* FEATURED BOOKS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-visible">
            {featuredBooks.map((book) => (
              <BookCard 
              key={book.id} 
              book={book} 
              />
            ))}
          </div>
        </section>

        {/* CATEGORY BOOKS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Browse By Category
          </h2>

          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-indigo-600">
                {category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-visible">
                {books
                  .filter((book) => book.category === category)
                  .map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
            </div>
          ))}
        </section>

        {/* DISCOUNTED BOOKS */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            🔥 Discounted Books
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-visible">
            {discountedBooks.map((book) => (
              <BookCard 
              key={book.id} 
              book={book} 
              showDiscount />
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
        <p>© 2026 BookVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};
const BookCard = ({ book, showDiscount }) => {
  const finalPrice = showDiscount
    ? Math.round(book.price - (book.price * book.discount) / 100)
    : book.price;

  return (
    <div className="relative group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300">
        {/* IMAGE AREA */}
        <div className="relative h-60 overflow-hidden">
          {/* IMAGE (blur on hover) */}
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-all duration-300 md:group-hover:blur-md md:group-hover:scale-105"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-4 text-center">
            <div className="text-white">
              <h4 className="font-semibold text-lg mb-2">{book.title}</h4>
              <p className="text-sm">{book.description}</p>
            </div>
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="p-4">
          <h4 className="font-semibold text-lg text-gray-800">{book.title}</h4>

          <p className="text-sm text-gray-500 mb-2">{book.author}</p>

          {/* Mobile Description */}
          <p className="text-sm text-gray-600 mb-3 md:hidden">
            {book.description}
          </p>

          {showDiscount ? (
            <div>
              <span className="text-gray-400 line-through mr-2">
                ₹{book.price}
              </span>
              <span className="text-red-600 font-bold">₹{finalPrice}</span>
            </div>
          ) : (
            <p className="font-bold text-indigo-600">₹{book.price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
