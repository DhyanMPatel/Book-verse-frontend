import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Book, Heart, ShoppingBag, Trash2 } from "lucide-react"

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, title: "Atomic Habits", author: "James Clear", price: 399, originalPrice: 499, discount: 20 },
    { id: 2, title: "Deep Work", author: "Cal Newport", price: 349, originalPrice: 449, discount: 22 },
    { id: 3, title: "Psychology of Money", author: "Morgan Housel", price: 549, originalPrice: 699, discount: 21 },
    { id: 4, title: "Clean Code", author: "Robert Martin", price: 599, originalPrice: 799, discount: 25 },
    { id: 5, title: "Zero to One", author: "Peter Thiel", price: 499, originalPrice: 599, discount: 17 },
    { id: 6, title: "Sapiens", author: "Yuval Harari", price: 650, originalPrice: 850, discount: 24 },
  ])

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Wishlist
        </h2>
        <span className="text-sm text-gray-500">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Add books you love to see them here</p>
        </motion.div>
      )}

      {/* Wishlist Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -3 }}
              className="group bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200"
            >
              {/* Book Cover */}
              <div className="relative w-full h-36 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                <Book className="w-10 h-10 text-blue-500" />
                
                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Book Info */}
              <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{item.author}</p>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-green-600">₹{item.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{item.discount}% OFF</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Wishlist
