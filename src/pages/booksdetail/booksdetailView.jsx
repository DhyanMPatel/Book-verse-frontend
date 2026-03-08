import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useParams } from "react-router-dom";


export default function BookDetailView() {

  const [book, setBook] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState("");
  const { id } = useParams();

  // Fetch book data
  useEffect(() => {
  const fetchBook = async () => {
    try {
      const response = await axiosInstance.get(`/books/details/${id}`);
      console.log("response from the books details");
      setBook(response?.data?.data?.bookDetailData);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };
  fetchBook();
}, [id]);
// console.log(book.)

  const checkDelivery = () => {

    if (pincode.length === 6) {
      setDeliveryResult("Delivery in 3-5 days");
    } else {
      setDeliveryResult("Enter valid pincode");
    }

  };

 

  if (!book) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-6xl mx-auto">

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="h-[420px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="max-h-full hover:scale-110 transition"
              />
            </div>
          </div>

          {/* BOOK INFO */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-gray-500">by {book.author}</p>

            <div className="text-yellow-500 mt-2">
              {"⭐".repeat(book.rating)} ({book.reviewsCount} reviews)
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-3">

              <span className="text-2xl font-bold">
                ₹{book.price}
              </span>

              {book.oldPrice && (
                <span className="line-through text-gray-400">
                  ₹{book.oldPrice}
                </span>
              )}

              {book.discount && (
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {book.discount}% OFF
                </span>
              )}

            </div>

            {book.stock && (
              <p className="text-green-600 font-semibold mt-2">
                In Stock
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
                Add to Cart
              </button>

              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
                Buy Now
              </button>

            </div>

            {/* BOOK DETAILS */}
            <h3 className="mt-8 mb-3 font-semibold text-lg">
              Book Details
            </h3>

            <table className="w-full text-sm">

              <tbody>

                {Object.entries(book.details || {}).map(([key, value]) => (

                  <tr key={key} className="border-b">

                    <td className="py-2 font-semibold capitalize">
                      {key}
                    </td>

                    <td>{value}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-xl font-semibold mb-3">
            Description
          </h2>

          <p className={`${expanded ? "" : "max-h-[120px] overflow-hidden"}`}>
            {book.description}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 mt-2"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>

        </div>

        {/* REVIEWS */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-xl font-semibold mb-3">
            Ratings & Reviews
          </h2>

          {book.Reviews?.map((review, index) => (

            <div key={index} className="border-b py-2">

              <strong>{Reviews.name}</strong>
              <p>{Reviews.comment}</p>

            </div>

          ))}

        </div>

        {/* RELATED BOOKS */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Related Books
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {book.relatedBooks?.map((b, index) => (

              <div
                key={index}
                className="p-3 rounded-lg shadow text-center bg-white"
              >

                <img
                  src={b.image}
                  alt={b.title}
                  className="h-[150px] mx-auto rounded-md object-cover"
                />

                <p className="mt-2">{b.title}</p>

                <strong>₹{b.price}</strong>

                <button className="block w-full mt-2 bg-indigo-50 py-1 rounded">
                  Add
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* OFFERS */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-xl font-semibold mb-3">
            Offers
          </h2>

          {book.offers?.map((offer, index) => (

            <div key={index} className="bg-green-50 p-2 rounded mb-2">
              {offer}
            </div>

          ))}

        </div>

        {/* DELIVERY */}
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <h2 className="text-xl font-semibold mb-3">
            Delivery
          </h2>

          <div className="flex gap-2">

            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode"
              className="border px-3 py-2 rounded-md"
            />

            <button
              onClick={checkDelivery}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Check
            </button>

          </div>

          <p className="mt-2">{deliveryResult}</p>

        </div>

      </div>

    </div>
  );
}

