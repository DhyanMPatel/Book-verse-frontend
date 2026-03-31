import axiosInstance from '../../services/axiosInstance'
import CartView from './cartView'

const CartContainer = () => {
  const handlePayment = async (amount, cartItems, userId) => {
    const res = await axiosInstance.get('/order/create', {amount: amount, cartItems: cartItems, userId: userId})

    const option = {
      key: "RAZORPAY_KEY_ID",
    amount: res.amount,
    currency: "INR",
    name: "BookVerse",
    description: "Test Transaction",
    order_id: res.id,
    handler: async function (response) {
      await axios.post("/verify-payment", response);
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
