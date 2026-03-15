import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET REVIEWS
  const fetchReviews = async (bookId) => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/reviews/book/${bookId}`);
      const reviewList = res?.data?.data?.reviews || [];

      setReviews(reviewList);
    } catch (error) {
      console.error("Fetch review error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ADD REVIEW
  const addReview = async (bookId, rating, reviewText) => {
    try {
      const res = await axiosInstance.post(`/reviews/book/${bookId}`, {
        rating,
        reviewText,
      });
      toast.success(res.data?.message);
      const newReview = res?.data?.data;

      setReviews((prev) => [newReview, ...prev]);

      return newReview;
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error("Create review error:", error.response?.data || error);
    }
  };

  // LIKE REVIEW
  const likeReview = async (reviewId) => {
    try {
      const res = await axiosInstance.post(`/reviews/${reviewId}/like`);

      const updatedLikes = res?.data?.data?.likes;

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          String(review.id) === String(reviewId)
            ? { ...review, likes: updatedLikes }
            : review,
        ),
      );
    } catch (error) {
      console.error("Like review error:", error);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        fetchReviews,
        likeReview,
        addReview,
        loading,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
