import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, Download, BookOpen, FileText, Calendar, Trash2 } from 'lucide-react'

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
}

const LibraryView = ({ books, onDownload, onRead }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: springTransition
    }
  }

  const getFormatIcon = (format) => {
    return format === 'PDF' ? <FileText className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={springTransition}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Library
        </h2>
        <span className="text-sm text-gray-500">
          {books.length} {books.length === 1 ? 'book' : 'books'}
        </span>
      </motion.div>

      {/* Empty State */}
      {books.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Book className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your library is empty</h3>
          <p className="text-gray-500">Purchase books to see them here</p>
        </motion.div>
      )}

      {/* Books Grid - Same as Wishlist */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <motion.div
              key={book.id}
              layout
              variants={itemVariants}
              exit={{ opacity: 0, scale: 0.8, x: 100 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: springTransition
              }}
              className="group bg-gray-50 rounded-2xl p-4 hover:shadow-xl transition-shadow"
            >
              {/* Book Cover */}
              <div className="relative w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={springTransition}
                >
                  <Book className="w-12 h-12 text-blue-600" />
                </motion.div>
                
                {/* Format Badge */}
                <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded-md text-xs font-medium text-gray-700 flex items-center gap-1">
                  {getFormatIcon(book.format)}
                  {book.format}
                </span>
              </div>

              {/* Book Info */}
              <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{book.author}</p>

              {/* Purchase Date */}
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(book.purchasedDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRead(book.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDownload(book.id)}
                  className="flex items-center justify-center p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default LibraryView