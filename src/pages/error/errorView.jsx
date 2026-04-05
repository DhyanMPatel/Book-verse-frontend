import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

const ErrorView = ({ 
  errorCode, 
  errorMessage, 
  errorDescription, 
  onGoHome,
  onGoBack
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
      >
        {/* Simple Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...springTransition, delay: 0.1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.h1 
          className="text-7xl font-bold text-gray-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springTransition, delay: 0.2 }}
        >
          {errorCode}
        </motion.h1>

        {/* Error Message */}
        <motion.h2 
          className="text-xl font-semibold text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springTransition, delay: 0.3 }}
        >
          {errorMessage}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springTransition, delay: 0.4 }}
        >
          {errorDescription}
        </motion.p>

        {/* Simple Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.5 }}
        >
          <motion.button 
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </motion.button>
          
          <motion.button 
            onClick={onGoBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="mt-12 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springTransition, delay: 0.6 }}
        >
          BookVerse • Your Digital Library
        </motion.p>
      </motion.div>
    </div>
  )
}

export default ErrorView
