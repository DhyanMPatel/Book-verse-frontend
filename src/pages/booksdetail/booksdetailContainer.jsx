import React from 'react'
import BookDetailView  from './booksdetailView';

const BooksDetailContainer = () => {
  return (
    <>
      <BookDetailView />
    </>
  )
}

export default BooksDetailContainer


// import React, { useState, useEffect } from 'react';
// // import BookDetailView from './booksdetailview';
// import BookDetailView  from './booksdetailView';
// import axiosInstance from "../../services/axiosInstance";
// import { useReviews } from "../../contexts/ReviewContext";
// import { useParams } from "react-router-dom";

// const BooksDetailContainer = () => {
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const { fetchReviews, reviews } = useReviews();
//   const { id } = useParams(); // get id from route

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);

//         const response = await axiosInstance.get(`/books/details/${id}`);

//         if (id) {
//           fetchReviews(id);
//         }

//         const bookData = response?.data?.data?.bookDetailData;
//         setBook(bookData);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching book:", error);
//         setError("Failed to load book details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchBook();
//     }
//   }, [id]);

//   return (
//     <BookDetailView 
//       book={book} 
//       loading={loading} 
//       error={error} 
//       reviews={reviews} 
//     />
//   );
// };

// export default BooksDetailContainer;