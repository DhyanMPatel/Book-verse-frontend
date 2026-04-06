import React from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import BookDetailView from "./booksdetailView"
import axiosInstance from '../../services/axiosInstance';


const BooksDetailContainer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
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
 
  return (
    <div>
      <BookDetailView handlePayment={handlePayment} isProcessing={isProcessing} />
    </div>
  )
}

export default BooksDetailContainer
