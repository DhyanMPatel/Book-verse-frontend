import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, LogOut, Check } from 'lucide-react'
import { useAuth } from "../../hooks/useAuth";

import PersonalInfo from './components/PersonalInfo'
import ProfileSidebar from './components/ProfileSidebar'
import OrderHistory from './components/OrderHistory'
import Wishlist from './components/Wishlist'


const ProfileView = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')
  const { logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Nisarg',
    lastName: 'patel',
    email: 'nisargpatel@gmail.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-06-15',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    preferences: {
      newsletter: true,
      notifications: true,
      darkMode: false
    }
  })

  const [tempProfileData, setTempProfileData] = useState(profileData)

const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  const userStats = {
    totalOrders: 24,
    totalBooks: 47,
    wishlistItems: 12,
    memberSince: '2022-01-15'
  }

  const orderHistory = [
    {
      id: 'ORD001',
      date: '2024-03-10',
      total: 1299,
      status: 'Delivered',
      books: []
    },
    {
      id: 'ORD002',
      date: '2024-02-28',
      total: 899,
      status: 'Delivered',
      books: []
    }
  ]

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ]

  // Handlers
  const handleEdit = () => {
    setTempProfileData(profileData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfileData(tempProfileData)
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    setTempProfileData(profileData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setTempProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className=" flex lg:hidden items-center gap-2  text-red-500 hover:text-red-600 transition-colors min"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>

      </motion.div>


      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <ProfileSidebar
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          profileData={profileData}
          userStats={userStats}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleImageUpload={handleImageUpload}
          isEditing={isEditing}
        />

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            
            {activeTab === 'personal' && (
              <PersonalInfo
                isEditing={isEditing}
                profileData={profileData}
                tempProfileData={tempProfileData}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleInputChange={handleInputChange}
              />
            )}

            {activeTab === 'orders' && (
              <OrderHistory orderHistory={orderHistory} />
            )}

            {activeTab === 'wishlist' && <Wishlist />}

            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-xl shadow">
                Settings (same as before — you can extract later)
              </div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileView