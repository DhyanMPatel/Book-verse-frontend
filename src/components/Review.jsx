import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import Rating from "@mui/material/Rating";
import { useReviews } from "../contexts/ReviewContext";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Stars({ rating }) {
  return <Rating value={rating} precision={1} readOnly size="small" />;
}

function RatingInput({ rating, setRating, defaultValue }) {
  const handleRating = (event, newValue) => {
    const value = newValue ?? defaultValue;
    setRating(value);
  };

  return (
    <div>
      <Rating value={rating} precision={1} onChange={handleRating} />
    </div>
  );
}

function formatTime(isoOrDate) {
  if (!isoOrDate) return "just now";

  const now = Date.now();
  const date =
    typeof isoOrDate === "string" ? new Date(isoOrDate) : new Date(isoOrDate);
  const diff = Math.floor((now - date.getTime()) / 1000);

  if (diff < 10) return "just now";
  if (diff < 60) return `${diff} seconds ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
}

export default function Reviews({ bookId }) {
  const { reviews, fetchReviews, addReview, likeReview } = useReviews();
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const defaultUserRating = 0;
  const [rating, setRating] = useState(defaultUserRating);

  useEffect(() => {
    if (bookId) {
      fetchReviews(bookId);
    }
  }, [bookId]);

  const avgRating =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce(
              (acc, r) => acc + (r.rating ?? defaultUserRating),
              0,
            ) / reviews.length
          ).toFixed(1),
        )
      : defaultUserRating;

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const trimmed = reviewText.trim();
    if (!trimmed) return;

    try {
      await addReview(bookId, rating, trimmed);
    } catch (error) {
      console.error("Failed to add review:", error);
    }

    setReviewText("");
    setShowReviewBox(false);
    setRating(defaultUserRating);
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
       className="max-w-6xl mx-auto mt-12 px-6"
    >
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Stars rating={avgRating} />
            <span className="ml-2">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {reviews.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="p-1 rounded-2xl border-b last:border-none hover:bg-gray-50 transition"
            >
              <div className="text-gray-500">
                No reviews yet — be the first to write one.
              </div>
            </motion.div>
          )}

          {reviews.map((review) => (
            <motion.div
              initial={false}
              key={review.id}
              variants={itemVariants}
              className="p-1 rounded-2xl border-b last:border-none hover:bg-gray-50 transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {review.userId?.name?.charAt(0) || "U"}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-semibold text-gray-800">
                      {review.userId?.name || "User"}
                    </h4>

                    <Stars rating={review.rating ?? defaultUserRating} />

                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                      Verified Purchase
                    </span>
                  </div>

                  <p className="text-gray-700 mt-2 text-base leading-relaxed">
                    {review.reviewText}
                  </p>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                    <span>{formatTime(review.createdAt)}</span>

                    <button
                      onClick={() => likeReview(review.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <ThumbsUp size={16} />
                      <span>{review.likes || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowReviewBox((s) => !s)}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-md hover:shadow-lg transition"
        >
          Write a Review
        </motion.button>
        {showReviewBox && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <div className="text-sm mb-1">Your Rating</div>
                  <RatingInput
                    rating={rating}
                    setRating={setRating}
                    defaultValue={defaultUserRating}
                  />
                </div>

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewBox(false);
                      setReviewText("");
                      setRating(defaultUserRating);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 active:scale-95"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!reviewText.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg active:scale-95 "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
