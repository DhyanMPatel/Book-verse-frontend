import React from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import BookDetailView from "./booksdetailView"
import axiosInstance from '../../services/axiosInstance';


const BooksDetailContainer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [liked, setLiked] = useState(false);

const user = JSON.parse(localStorage.getItem('user')) || {};
const handlePayment = async (amount, cartItems) => {
    if (!user?._id) {
  toast.error("User not logged in");
  return;
}
    setIsProcessing(true);
    try {
      const res = await axiosInstance.post('/order/create', {totalAmount: amount, cartItems: cartItems, userId: user._id});

      console.log("Response on Create", res)

      const option = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.data.amount, // Convert to paise
        currency: "INR",
        name: "BookVerse",
        description: "Test Transaction",
        order_id: res.data.data.razorpayOrderId,
        handler: async function (response) {
          try {
            // console.log(response, "Response")
            const verifyRes = await axiosInstance.post("/order/verify-payment", {
              ...response,
              razorpay_order_id: response.razorpay_order_id,
            });
            // Success modal
            Swal.fire({
              title: 'Payment Successful!',
              text: `Order ID: ${verifyRes.data.orderId || response.razorpay_order_id}`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        onError: function(error) {
          toast.error("Payment failed: " + error.description);
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(option);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setIsProcessing(false);
    }
  }


const handleClickWishlist = async (book) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?._id) {
    toast.error("Please login first");
    return;
  }

  const bookId = book._id || book.id || book.bookId;

  try {
    if (!liked) {
      // ADD TO WISHLIST
      await axiosInstance.post("/wishlist/add", { bookId });
      setLiked(true);
      Swal.fire({ icon: "success", title: "Added to Wishlist ❤️", text: book.title });

    } else {
      // REMOVE FROM WISHLIST
      await axiosInstance.delete(`/wishlist/remove/${bookId}`);
      setLiked(false);
      Swal.fire({ icon: "info", title: "Removed from Wishlist 🤍", text: book.title });
    }

  } catch (error) {
    console.error(error);

    // ✅ If already in wishlist (400), just sync the state and remove it
    if (error.response?.status === 400 && !liked) {
      setLiked(true); // sync state to reality
      toast.info("Already in wishlist — click again to remove");
      return;
    }

    toast.error(error.response?.data?.message || "Wishlist error");
  }
};

  return (
    <div>
      <BookDetailView 
      handlePayment={handlePayment}
      isProcessing={isProcessing}
      handleClickWishlist={handleClickWishlist}
      liked={liked}
      />
    </div>
  )
}

export default BooksDetailContainer
