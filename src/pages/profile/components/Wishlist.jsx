import React, { useState } from "react"

import { motion } from "framer-motion"

import { Book, Heart } from "lucide-react"



const Wishlist = () => {

  // Track which books are in the wishlist

  const [wishlistItems, setWishlistItems] = useState([])



  const toggleWishlist = (item) => {

    if (wishlistItems.includes(item)) {

      setWishlistItems(wishlistItems.filter((i) => i !== item))

    } else {

      setWishlistItems([...wishlistItems, item])

    }

  }



  return (

    <motion.div

      key="wishlist"

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      exit={{ opacity: 0, y: -20 }}

      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"

    >

      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">

        My Wishlist

      </h2>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {[1, 2, 3, 4, 5, 6].map((item) => {

          const liked = wishlistItems.includes(item)



          return (

            <motion.div

              key={item}

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ delay: item * 0.1 }}

              whileHover={{ y: -5, scale: 1.02 }}

              className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow relative"

            >

              {/* Book Image */}

              <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">

                <Book className="w-12 h-12 text-blue-600" />

              </div>



              {/* Book Info */}

              <h3 className="font-semibold text-gray-800 mb-2">Book Title {item}</h3>

              <p className="text-sm text-gray-600 mb-3">Author Name</p>



              {/* Price + Wishlist Button */}

              <div className="flex justify-between items-center">

                <p className="text-lg font-bold text-green-600">₹{item * 199}</p>



                <motion.button

                  whileHover={{ scale: 1.1 }}

                  whileTap={{ scale: 0.9 }}

                  onClick={() => toggleWishlist(item)}

                  className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-md sm:shadow-lg cursor-pointer flex items-center justify-center"

                >

                  <motion.div

                    animate={{ scale: liked ? [1, 1.4, 1] : 1 }}

                    transition={{ duration: 0.3 }}

                  >

                    <Heart

                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${

                        liked ? "fill-red-500 text-red-500" : "text-gray-400"

                      }`}

                    />

                  </motion.div>

                </motion.button>

              </div>

            </motion.div>

          )

        })}

      </div>

    </motion.div>

  )

}



export default Wishlist

