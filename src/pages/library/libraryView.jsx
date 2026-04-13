import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { Book, Download, BookOpen, FileText, Calendar } from 'lucide-react'



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



const LibraryView = ({ books, onDownload, onRead }) => {



  const getFormatIcon = (format) => {

    return format === 'PDF' ? <FileText className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />

  }



  return (

    <motion.div

      initial={{ opacity: 0, y: 10 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}

      className="bg-white rounded-2xl shadow-xl p-4 lg:p-6"

    >

      {/* Header */}

      <motion.div 

        initial={{ opacity: 0, x: -10 }}

        animate={{ opacity: 1, x: 0 }}

        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}

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

          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}

          className="text-center py-12"

        >

          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">

            <Book className="w-10 h-10 text-gray-300" />

          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your library is empty</h3>

          <p className="text-gray-500">Purchase books to see them here</p>

        </motion.div>

      )}



      {/* Books Grid - Premium Animated */}

      <motion.div

        variants={containerVariants}

        initial="hidden"

        animate="show"

        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"

      >

        <AnimatePresence mode="popLayout">

          {books.map((book, index) => (

            <motion.div

              key={book.id}

              variants={cardVariants}

              exit="exit"

              whileHover={{ 

                y: -8, 

                scale: 1.02,

                transition: {

                  type: 'spring',

                  stiffness: 120,

                  damping: 20,

                  mass: 0.5,

                }

              }}

              className="group relative bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-shadow duration-500 ease-out overflow-hidden will-change-transform"

              style={{

                background: 'linear-gradient(145deg, #ffffff, #f9fafb)',

              }}

            >

              {/* Subtle glow effect on hover */}

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/[0.03] group-hover:to-purple-500/[0.05] transition-all duration-700 ease-out rounded-2xl pointer-events-none" />

              {/* Book Cover */}

              {/* Smooth Book Cover */}

              <div 

                className="relative w-full h-40 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-inner transition-all duration-500 ease-out"

              >

                {book.cover ? (

                  <img

                    src={book.cover}

                    alt={book.title}

                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"

                  />

                ) : (

                  <div className="relative">

                    <Book className="w-12 h-12 text-blue-400/70 transition-all duration-500 group-hover:text-blue-500/80" />

                  </div>

                )}



                {/* Format Badge - smooth fade */}

                <span 

                  className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"

                >

                  {getFormatIcon(book.format)}

                  {book.format}

                </span>



                {/* Smooth hover overlay */}

                <div

                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out rounded-xl pointer-events-none"

                />

              </div>



              {/* Book Info - smooth transitions */}

              <h3 

                className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300 ease-out"

              >

                {book.title}

              </h3>

              <p className="text-xs text-gray-500 mb-3">

                {book.author}

              </p>



              {/* Purchase Date */}

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">

                <Calendar className="w-3.5 h-3.5" />

                {new Date(book.purchasedDate).toLocaleDateString('en-US', {

                  month: 'short',

                  day: 'numeric',

                  year: 'numeric'

                })}

              </div>



              {/* Smooth Action Buttons */}

              <div className="flex items-center gap-2">

                <button

                  onClick={() => onRead(book.id)}

                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 ease-out"

                >

                  <BookOpen className="w-3.5 h-3.5" />

                  Read

                </button>

                <button

                  onClick={() => onDownload(book.id)}

                  className="flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:shadow-md active:scale-95 transition-all duration-300 ease-out"

                >

                  <Download className="w-4 h-4" />

                </button>

              </div>

            </motion.div>

          ))}

        </AnimatePresence>

      </motion.div>

    </motion.div>

  )

}



export default LibraryView