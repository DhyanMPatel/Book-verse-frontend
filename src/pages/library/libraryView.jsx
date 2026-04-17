import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Book, Download, BookOpen, FileText, Calendar, Search, X } from 'lucide-react'
import { toast } from 'react-toastify'


// Smooth spring configuration - higher damping for buttery feel

const smoothSpring = {

  type: 'spring',

  stiffness: 100,

  damping: 25,

  mass: 1,

}


// Stagger container animation

const containerVariants = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: {

      staggerChildren: 0.06,

      delayChildren: 0.05,

    }

  }

}


// Smooth card animation

const cardVariants = {

  hidden: { 

    opacity: 0, 

    y: 20, 

    scale: 0.95,

  },

  show: { 

    opacity: 1, 

    y: 0, 

    scale: 1,

    transition: {

      type: 'spring',

      stiffness: 80,

      damping: 30,

      mass: 0.8,

    }

  },

  exit: {

    opacity: 0,

    scale: 0.9,

    y: -10,

    transition: { 

      duration: 0.2,

      ease: 'easeInOut'

    }

  }

}


const LibraryView = ({ books, allBooks, onDownload, onRead, searchQuery, setSearchQuery }) => {



  const getFormatIcon = (format) => {

    return format === 'PDF' ? <FileText className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />

  }

  // Handle download with toast
  const handleDownload = (bookId, bookTitle) => {
    onDownload(bookId);
    toast.success(`"${bookTitle}" downloaded successfully!`);
  }



  return (

    <motion.div

      initial={{ opacity: 0, y: 10 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}

      className="bg-white rounded-2xl shadow-xl p-4 lg:p-6"

    >

      {/* Header with Search */}

      <motion.div 

        initial={{ opacity: 0, x: -10 }}

        animate={{ opacity: 1, x: 0 }}

        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}

        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"

      >

        <div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

            My Library

          </h2>

          <span className="text-sm text-gray-500">

            {allBooks?.length || books.length} {allBooks?.length === 1 || books.length === 1 ? 'book' : 'books'} total

          </span>

        </div>

        
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40 sm:w-56"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
        </div>

      </motion.div>



      {/* Empty State */}

      {books.length === 0 && (

        <motion.div

          initial={{ opacity: 0, scale: 0.9 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}

          className="text-center py-12"

        >

          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">

            <Book className="w-10 h-10 text-gray-300" />

          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">

            {searchQuery ? 'No books found' : 'Your library is empty'}

          </h3>

          <p className="text-gray-500">

            {searchQuery ? 'Try a different search term' : 'Purchase books to see them here'}

          </p>

        </motion.div>

      )}



      {/* Books Grid - Compact Professional */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="group relative bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow duration-500 overflow-hidden"
          >
            {/* Book Cover */}
            <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-inner transition-all duration-500">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Book className="w-12 h-12 text-blue-400/70" />
                </div>
              )}
              {/* Format Badge */}
              <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 shadow-sm">
                {book.format}
              </span>
            </div>

            {/* Book Info */}
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              {book.author}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRead(book.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all duration-300"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Read
              </button>
              <button
                onClick={() => handleDownload(book.id, book.title)}
                className="flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:shadow-md active:scale-95 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </motion.div>

  );
};

export default LibraryView