import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const CouponCard = ({ 
  brand = "BookVerse",
  discount = 20,
  code = "Bookv20",
  validUntil = "Dec 31, 2025",
  onCopy
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    if (onCopy) onCopy(code);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
    >
      {/* Ticket Shape with Cutouts */}
      <div className="flex">
        {/* Left Side - Logo Area */}
        <div className="w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col items-center justify-center relative">
          {/* Semi-circle cutout right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-gray-50 rounded-full"></div>
          
          <BookOpen className="w-14 h-14 text-white mb-1" />
          <p className="text-white font-bold text-base">{brand}</p>
        </div>
        
        {/* Perforated Line */}
        <div className="w-px bg-gray-300 relative">
          <div className="absolute inset-0 border-l-2 border-dashed border-gray-300"></div>
        </div>
        
        {/* Right Side - Coupon Details */}
        <div className="w-2/3 p-6 flex flex-col justify-center relative">
          {/* Semi-circle cutout left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-gray-50 rounded-full"></div>
          
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">{brand}</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl text-gray-400 font-medium">%</span>
            <span className="text-5xl font-bold text-gray-800">{discount}</span>
            <span className="text-xl text-gray-500 uppercase tracking-wider ml-1">OFF</span>
          </div>
          <p className="text-gray-400 text-sm">Valid until {validUntil}</p>
          
          {/* Code */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-mono font-bold text-blue-600 tracking-widest">{code}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="text-sm bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full font-medium hover:bg-blue-200 transition-colors active:scale-95"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CouponCard;
