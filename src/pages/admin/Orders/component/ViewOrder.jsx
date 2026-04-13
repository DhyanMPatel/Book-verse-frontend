import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../AdminOrdersStyle.css";

const ViewOrder = ({ isOpen, onClose, orderData }) => {
  if (!isOpen || !orderData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      paid: "bg-green-100 text-green-800 border-green-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      failed: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-500">
                    Order ID: {orderData.razorpayOrderId?.substring(0, 20) || orderData.id?.substring(0, 20)}...
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0 bg-gray-50">
            <div className="space-y-6">

              {/* Status Banner */}
              <div className={`rounded-lg p-4 border-2 ${getStatusColor(orderData.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      Status: {orderData.status?.charAt(0).toUpperCase() + orderData.status?.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm">
                    {orderData.status === "paid" || orderData.status === "completed" ? "✓ Payment Successful" : 
                     orderData.status === "pending" ? "⏳ Payment Pending" : 
                     orderData.status === "failed" ? "✗ Payment Failed" : ""}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Summary
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <PriceCard label="Total Amount" value={`₹${orderData.totalAmount || 0}`} highlight />
                  <PriceCard label="Currency" value={orderData.currency || "INR"} />
                  <PriceCard label="Items Count" value={orderData.items?.length || 0} />
                  <PriceCard label="Order Date" value={formatDate(orderData.createdAt)} />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Razorpay Order ID" value={orderData.razorpayOrderId} />
                  <InfoItem label="Razorpay Payment ID" value={orderData.razorpayPaymentId || "Pending"} />
                  {orderData.razorpaySignature && (
                    <div className="md:col-span-2 bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Signature</label>
                      <span className="text-xs font-mono text-gray-600 break-all">{orderData.razorpaySignature}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Buyer Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Buyer Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Buyer Name" value={orderData.userId?.name || "N/A"} />
                  <InfoItem label="Buyer Email" value={orderData.userId?.email || "N/A"} />
                  <InfoItem label="Buyer User ID" value={orderData.userId?._id || orderData.userId?.id || orderData.userId || "N/A"} />
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Order Items ({orderData.items?.length || 0})
                </h3>

                <div className="space-y-3">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.title || "Unknown Book"}</h4>
                        <p className="text-sm text-gray-500">Book ID: {item.bookId?.toString().substring(0, 20) || item.bookId}...</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{item.price || 0}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-gray-900">₹{(item.price || 0) * (item.quantity || 1)}</p>
                      </div>
                    </div>
                  )) || <p className="text-gray-500 text-center py-4">No items in this order</p>}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">₹{orderData.totalAmount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Order ID:</span>
                    <span className="ml-2 font-medium font-mono text-xs">{orderData.id || orderData._id || "N/A"}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Order Placed:</span>
                    <span className="ml-2 font-medium">{formatDateTime(orderData.createdAt)}</span>
                  </div>
                  {orderData.updatedAt && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="ml-2 font-medium">{formatDateTime(orderData.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6 shrink-0">
            <div className="flex justify-end">
              <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className="text-sm font-medium text-gray-800">{value || "N/A"}</span>
  </div>
);

const PriceCard = ({ label, value, highlight = false }) => (
  <div className={`rounded-lg p-4 text-center ${highlight ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"}`}>
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className={`text-lg font-semibold ${highlight ? "text-green-600" : "text-gray-800"}`}>{value}</span>
  </div>
);

export default ViewOrder;