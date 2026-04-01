import axiosInstance from '../../services/axiosInstance'
import CartView from './cartView'

const CartContainer = () => {
  const handlePayment = async (amount, cartItems, userId) => {
    const res = await axiosInstance.post('/order/create', {totalAmount: amount, cartItems: cartItems, userId: userId})

    const option = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: res.amount,
    currency: "INR",
    name: "BookVerse",
    description: "Test Transaction",
    order_id: res.orderId,
    handler: async function (response) {
      console.log("Response", response)
      await axiosInstance.post("/order/verify-payment", response);
    },
    theme: {
      color: "#3399cc",
    },
    }
    const rzp = new window.Razorpay(option);
    rzp.open()
  }
  return (
    <>
      <CartView handlePayment={handlePayment} />
    </>
  )
}

export default CartContainer
