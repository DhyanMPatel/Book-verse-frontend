import { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CartView from './cartView';

const CartContainer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const handlePayment = async (amount, cartItems) => {
    setIsProcessing(true);
    try {
      const res = await axiosInstance.post('/order/create', {totalAmount: amount, cartItems: cartItems, userId: user._id});

      // console.log("Response on Create", res)

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
            
            // Clear the cart after successful payment
            await axiosInstance.delete('/cart/clear');
            
            // Success modal
            await Swal.fire({
              title: 'Payment Successful!',
              text: `Order ID: ${verifyRes.data.orderId || response.razorpay_order_id}`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
            
            // Refresh page to show empty cart
            window.location.reload();
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

  const handleClearCart = async () => {
    try {
      const result = await Swal.fire({
        title: 'Clear Cart?',
        text: 'Are you sure you want to remove all items from your cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await axiosInstance.delete('/cart/clear');
        toast.success('Cart cleared successfully');
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      return false;
    }
  } 

  return (
    <>
      <CartView handlePayment={handlePayment} isProcessing={isProcessing} onClearCart={handleClearCart} />
    </>
  )
}

export default CartContainer