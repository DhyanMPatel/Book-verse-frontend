import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'

const OrderHistory = ({ orderHistory }) => {
  const [expandedOrder, setExpandedOrder] = useState(null)

  if (!orderHistory || orderHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Order History
        </h2>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No orders yet</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Order History
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {orderHistory.length} {orderHistory.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {orderHistory.map((order, index) => (
            <motion.div
              key={order.id || `order-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              {/* Order Header - Always Visible */}
              <div
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Order ID - Prominent */}
                  <p className="text-base font-mono font-bold text-gray-900">
                    {order.id}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      ₹{order.total}
                    </span>
                  </div>
                </div>
                {expandedOrder === order.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="px-3 pb-3 border-t border-gray-200">
                  <div className="pt-2 space-y-2">
                    {/* Books */}
                    {order.books?.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Books ({order.books.length})</p>
                        <div className="space-y-1">
                          {order.books.map((book, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <BookOpen className="w-3 h-3 text-blue-500" />
                              <span className="text-gray-700">{book.title || book.name}</span>
                              {book.quantity > 1 && (
                                <span className="text-gray-400 text-xs">x{book.quantity}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment & Address */}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 pt-1">
                      {order.paymentMethod && (
                        <span className="bg-gray-200 px-2 py-1 rounded">{order.paymentMethod}</span>
                      )}
                      {order.shippingAddress?.city && (
                        <span className="bg-gray-200 px-2 py-1 rounded">{order.shippingAddress.city}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default OrderHistory