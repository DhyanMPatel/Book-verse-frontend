import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { useState } from "react";

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
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function Reviews() {

  const [reviews, setReviews] = useState([
    {
      name: "Amit Sharma",
      rating: 5,
      comment:
        "Amazing book! The concepts are explained very clearly and it helped me improve my skills.",
      time: "2 days ago",
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment:
        "Great read with lots of practical insights. Highly recommend for beginners.",
      time: "5 days ago",
    },
    {
      name: "Rahul Mehta",
      rating: 5,
      comment:
        "One of the best books I've purchased this year. Worth every rupee!",
      time: "1 week ago",
    },
  ]);

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-3xl mx-auto mt-12 px-4"
    >
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Stars rating={5} />
            <span className="ml-2">{reviews.length} reviews</span>
          </div>
        </div>

        {/* Reviews List */}
        <motion.div variants={containerVariants} className="space-y-2">

          {reviews.map((review, index) => (

            <motion.div
              key={index}
              variants={itemVariants}
              className="p-5 rounded-2xl border-b last:border-none hover:bg-gray-50 transition"
            >

              <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {review.name?.charAt(0)}
                </div>

                <div className="flex-1">

                  {/* Name + rating */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-semibold text-gray-800">
                      {review.name}
                    </h4>

                    <Stars rating={review.rating} />

                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                      Verified Purchase
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3 text-sm text-gray-500">

                    <span>{review.time}</span>

                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white hover:bg-gray-100 hover:text-blue-400 transition-all duration-200">
                      <ThumbsUp size={16} />
                    </button>

                  </div>

                </div>
              </div>

            </motion.div>
          ))}

        </motion.div>

        {/* Review Textbox */}
        {showReviewBox && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={4}
            />
          </motion.div>
        )}

        {/* Write Review Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (!showReviewBox) {
              setShowReviewBox(true);
            } else {

              if (newReview.trim() === "") return;

              setReviews([
                ...reviews,
                {
                  name: "You",
                  rating: 5,
                  comment: newReview,
                  time: "Just now",
                },
              ]);

              setNewReview("");
              setShowReviewBox(false);
            }
          }}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-blue-500 to-purple-600
          shadow-md hover:shadow-lg transition"
        >
          {showReviewBox ? "Submit Review" : "Write a Review"}
        </motion.button>

      </div>
    </motion.section>
  );
}