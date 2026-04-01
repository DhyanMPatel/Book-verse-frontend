import React, { useState,useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import axiosInstance from '../../services/axiosInstance'
import { useNavigate } from "react-router-dom";


const CartView = (props) => {
  const {handlePayment, isProcessing} = props
  const [cart, setCart] = useState([])
const [loading, setLoading] = useState(true)
const navigate = useNavigate();
  // STATIC CART DATA

useEffect(() => {
  fetchCart()
}, [])

const fetchCart = async () => {
  try {
    const res = await axiosInstance.get('/cart/get')
    setCart(res.data.data.items || [])
    console.log('Cart data:', res.data.data.items)
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)

  // REMOVE ITEM
  const removeFromCart = async (bookId) => {
  try {
    await axiosInstance.delete(`/cart/remove/${bookId}`)
    fetchCart()
  } catch (error) {
    console.error(error)
  }
}

  // UPDATE QUANTITY
 const updateQuantity = async (bookId, quantity) => {
  try {
    await axiosInstance.put('/cart/update', {
      bookId,
      quantity
    })
    fetchCart()
  } catch (error) {
    console.error(error)
  }
}

  // CALCULATE TOTALS
 const subtotal = cart.reduce((total, item) => {
  const price = Number(item.price) || 0
  const quantity = Number(item.quantity) || 1
  return total + (price * quantity)
}, 0)
  // const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount

  // APPLY COUPON
  const applyCoupon = () => {
    if (!couponCode) {
      alert('Please enter a coupon code')
      return
    }

    const code = couponCode.trim().toLowerCase()
    if (code === 'save10') {
      setDiscount(subtotal * 0.1)
    } else if (code === 'save20') {
      setDiscount(subtotal * 0.2)
    } else {
      alert('Invalid coupon code')
    }
  }

  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🛒
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some books to get started!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    )
  }
  if (loading) {
  return <div className="text-center mt-10">Loading cart...</div>
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">{cart.length} items</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.bookId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex gap-4">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <motion.img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 truncate hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">by {item.author}</p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.bookId)}
                          className="text-red-500 hover:text-red-600 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-2xl font-bold text-green-600">₹{item.price}</p>
                          {item.price && (
                            <p className="text-sm text-gray-400 line-through"></p>
                          )}
                        </div>

                      </div>

                      {/* Item Subtotal */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          Subtotal: <span className="font-semibold text-gray-800">
  ₹{(Number(item.price) || 0) * (Number(item.quantity) || 1)}
</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>

                {/* <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div> */}

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Have a coupon code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyCoupon}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold"
                  >
                    Apply
                  </motion.button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 mt-2">Coupon applied successfully!</p>
                )}
              </div>

              {/* Free Shipping Notice */}
              {/* {subtotal < 500 && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-700">
                    Add ₹{500 - subtotal} more for FREE shipping! 🚚
                  </p>
                </div>
              )} */}
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCheckout(true)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Security Badges */}
            <div className="flex justify-center gap-4 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Secure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Safe</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Fast</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-[90%] max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Checkout
              </h3>
              <p className="text-gray-600 mb-6">
                Total amount: <span className="font-bold text-xl text-green-600">₹{total}</span>
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePayment(total, cart)}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckout(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CartView