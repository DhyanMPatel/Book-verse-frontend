import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Book, ShoppingBag, Heart } from 'lucide-react'

const ProfileSidebar = ({
  profileImage,
  setProfileImage,
  profileData,
  userStats,
  tabs,
  activeTab,
  setActiveTab,
  handleImageUpload
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-1"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        
        {/* Profile Image */}
        <div className="relative inline-block mb-4">
          <motion.img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
            whileHover={{ scale: 1.05 }}
          />
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </motion.label>
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          {profileData.firstName} {profileData.lastName}
        </h2>
        <p className="text-gray-600 mb-4">{profileData.email}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-xl">
            <Book className="mx-auto text-blue-600" />
            <p>{userStats.totalBooks}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-xl">
            <ShoppingBag className="mx-auto text-green-600" />
            <p>{userStats.totalOrders}</p>
          </div>
        </div>

        <div className="bg-purple-50 p-3 rounded-xl mb-6">
          <Heart className="mx-auto text-purple-600" />
          <p>{userStats.wishlistItems}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-xl p-2 mt-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ProfileSidebar