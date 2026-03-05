import React from "react";

/*
  BookCard Component

  book → single book object
  showDiscount → boolean to show discount price
*/

const BookCard = ({ book, showDiscount }) => {
  // final price calculate karva discount apply kari
  const finalPrice = showDiscount
    ? Math.round(book.price - (book.price * book.discount) / 100)
    : book.price;

  return (
    <div className="relative group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300">
        {/* IMAGE SECTION */}
        <div className="relative h-60 overflow-hidden">
          {/* Book Image */}
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-all duration-300 md:group-hover:blur-md md:group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-black/50 p-4 text-center">
            <div className="text-white">
              <h4 className="font-semibold text-lg mb-2">{book.title}</h4>

              <p className="text-sm">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="p-4">
          <h4 className="font-semibold text-lg text-gray-800">{book.title}</h4>

          <p className="text-sm text-gray-500 mb-2">{book.author}</p>

          {/* Mobile Description */}
          <p className="text-sm text-gray-600 mb-3 md:hidden">
            {book.description}
          </p>

          {/* Price Section */}
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

export default BookCard;
