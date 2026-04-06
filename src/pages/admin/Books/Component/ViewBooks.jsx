import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../AdminBooksStyle.css";

const ViewBooks = ({ isOpen, onClose, bookData }) => {
  if (!isOpen || !bookData) return null;

  const finalPrice = bookData.price && bookData.discount 
    ? Math.round(bookData.price - (bookData.price * bookData.discount) / 100)
    : bookData.price || 0;

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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
                  <p className="text-sm text-gray-500">View complete book information</p>
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
              
              {/* Book Cover & Basic Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                      <img
                        src={bookData.coverImage || bookData.image || "https://via.placeholder.com/150x220?text=No+Cover"}
                        alt={bookData.title}
                        className="w-36 h-52 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150x220?text=No+Cover"; }}
                      />
                      {bookData.discount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {bookData.discount}% OFF
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label="Title" value={bookData.title} />
                    <InfoItem label="Author" value={bookData.author} />
                    <InfoItem label="ISBN" value={bookData.isbn} />
                    <InfoItem label="Category" value={bookData.category} />
                    <InfoItem label="Publisher" value={bookData.publisher} />
                    <InfoItem label="Language" value={bookData.language} />
                    <InfoItem label="Format" value={bookData.format} />
                    <InfoItem label="Pages" value={bookData.pages} />
                    <InfoItem label="Published Date" value={formatDate(bookData.publishedDate)} />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm leading-relaxed max-h-32 overflow-y-auto">
                    {bookData.description || "No description available"}
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pricing & Inventory
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <PriceCard label="Original Price" value={`₹${bookData.price || 0}`} />
                  <PriceCard label="Discount" value={`${bookData.discount || 0}%`} className="text-red-500" />
                  <PriceCard label="Final Price" value={`₹${finalPrice}`} highlight />
                  <PriceCard label="Stock" value={bookData.stock ?? "N/A"} className={bookData.stock > 0 ? "text-blue-600" : "text-red-500"} />
                </div>
              </div>

              {/* Reviews Section */}
              {(bookData.avgRating || bookData.totalReviews) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Reviews & Ratings
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Average Rating</label>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-yellow-600">{bookData.avgRating || 0}</span>
                        <span className="text-lg text-gray-600">/5</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Reviews</label>
                      <span className="text-3xl font-bold text-blue-600">{bookData.totalReviews || 0}</span>
                    </div>
                  </div>
                </div>
              )}
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

const PriceCard = ({ label, value, className = "", highlight = false }) => (
  <div className={`rounded-lg p-4 text-center ${highlight ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"}`}>
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className={`text-lg font-semibold ${highlight ? "text-green-600" : className}`}>{value}</span>
  </div>
);

export default ViewBooks;
