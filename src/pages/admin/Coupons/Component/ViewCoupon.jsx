import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ViewCoupon = ({ isOpen, onClose, couponData }) => {
  if (!isOpen || !couponData) return null;

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

  const isActive = new Date(couponData.validTillDate) > new Date() && 
                   (!couponData.usageLimit || couponData.timesUsed < couponData.usageLimit);

  const usagePercentage = couponData.usageLimit 
    ? Math.round(((couponData.timesUsed || 0) / couponData.usageLimit) * 100)
    : 0;

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
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Coupon Details</h2>
                  <p className="text-sm text-gray-500">View complete coupon information</p>
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
              
              {/* Coupon Code & Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Coupon Information
                </h3>

                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <motion.div 
                      initial={{ scale: 0.9 }} 
                      animate={{ scale: 1 }}
                      className="inline-block bg-indigo-50 border-2 border-indigo-200 rounded-lg px-6 py-3"
                    >
                      <span className="text-3xl font-bold text-indigo-600 uppercase tracking-wider">
                        {couponData.couponCode}
                      </span>
                    </motion.div>
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                        {isActive ? "Active" : "Expired"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <InfoItem label="Discount Type" value={couponData.discountType} capitalize />
                  <InfoItem 
                    label="Discount Value" 
                    value={couponData.discountType === "percentage" 
                      ? `${couponData.discount}%` 
                      : `₹${couponData.discount}`} 
                  />
                  <InfoItem label="Category" value={couponData.categoryId?.name || "--"} />
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Usage Statistics
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard 
                    label="Times Used" 
                    value={couponData.timesUsed || 0} 
                    icon="usage"
                  />
                  <StatCard 
                    label="Usage Limit" 
                    value={couponData.usageLimit || "∞"} 
                    icon="limit"
                  />
                  <StatCard 
                    label="Remaining" 
                    value={couponData.usageLimit 
                      ? Math.max(0, couponData.usageLimit - (couponData.timesUsed || 0))
                      : "∞"} 
                    icon="remaining"
                    highlight={couponData.usageLimit && (couponData.usageLimit - (couponData.timesUsed || 0)) > 0}
                  />
                  <div className={`rounded-lg p-4 text-center ${couponData.usageLimit ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"}`}>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Usage</label>
                    <div className="text-lg font-semibold text-blue-600">
                      {couponData.usageLimit ? `${usagePercentage}%` : "Unlimited"}
                    </div>
                    {couponData.usageLimit && (
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Validity & Dates */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Validity & Dates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DateCard 
                    label="Valid Till" 
                    date={formatDate(couponData.validTillDate)}
                    isExpired={!isActive}
                  />
                  <DateCard 
                    label="Created At" 
                    date={formatDateTime(couponData.createdAt)}
                  />
                  <DateCard 
                    label="Updated At" 
                    date={formatDateTime(couponData.updatedAt)}
                  />
                </div>
              </div>

              {/* Description */}
              {couponData.description && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Description
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm leading-relaxed max-h-32 overflow-y-auto">
                    {couponData.description}
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

const InfoItem = ({ label, value, capitalize = false }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className={`text-sm font-medium text-gray-800 ${capitalize ? "capitalize" : ""}`}>{value || "N/A"}</span>
  </div>
);

const StatCard = ({ label, value, icon, highlight = false }) => {
  const icons = {
    usage: <svg className="w-5 h-5 text-blue-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    limit: <svg className="w-5 h-5 text-purple-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    remaining: <svg className="w-5 h-5 text-green-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };
  
  return (
    <div className={`rounded-lg p-4 text-center ${highlight ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"}`}>
      {icons[icon]}
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      <span className={`text-lg font-semibold ${highlight ? "text-green-600" : "text-gray-800"}`}>{value}</span>
    </div>
  );
};

const DateCard = ({ label, date, isExpired = false }) => (
  <div className={`rounded-lg p-4 text-center ${isExpired ? "bg-red-50 border-2 border-red-200" : "bg-gray-50"}`}>
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className={`text-sm font-semibold ${isExpired ? "text-red-600" : "text-gray-800"}`}>{date}</span>
  </div>
);

export default ViewCoupon;
