import React from 'react'
import { motion } from 'framer-motion'

const OrderHistory = ({ orderHistory }) => {
  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Order History
        </h2>

        <div className="space-y-4">
          {orderHistory.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {order.status}
                  </span>

                  <p className="text-xl font-bold text-green-600 mt-2">
                    ₹{order.total}
                  </p>
                </div>
              </div>

              {/* Books List */}
              <div className="space-y-2">
                {order.books.map((book, bookIndex) => (
                  <div
                    key={bookIndex}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {book.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        by {book.author}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-700">
                      ₹{book.price}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default OrderHistory