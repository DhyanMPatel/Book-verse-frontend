import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {

      const response = await axiosInstance.get("/books/all");

      setReviews(response.data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="card section">

      <h2>Ratings & Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div className="review" key={review.id}>
            <strong>{review.name}</strong>
            <p>{review.comment}</p>
          </div>
        ))
      )}

      <button className="secondary">Write Review</button>

    </div>
  );
}

export default Reviews;