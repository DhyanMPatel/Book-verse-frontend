// src/views/HomeView.jsx
import React from "react";
import { motion } from "framer-motion";

const HomeView = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        {/* Background Glow */}
        <div className="absolute top-[-200px] right-[-200px] w-[450px] h-[450px] bg-blue-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[450px] h-[450px] bg-purple-300 opacity-20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm uppercase tracking-[0.25em] text-blue-600 mb-6"
            >
              Curated Collection
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
            >
              Discover Stories
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unlock Your Next Adventure
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 max-w-md mb-8"
            >
              Explore timeless classics, inspiring stories, and modern insights
              carefully curated for passionate readers.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl"
                onClick={() => {
                  // example navigation handler - replace with router navigation if you use react-router / next/link etc.
                  window.location.href = "/books";
                }}
              >
                Explore Books
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600"
                onClick={() => {
                  window.location.href = "/categories";
                }}
              >
                Browse Categories
              </motion.button>
            </motion.div>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="Library"
              className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* (No book cards or book sections here) */}

      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
        <p>© 2026 BookVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeView;
