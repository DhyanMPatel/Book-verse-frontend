import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Shield, Book, ShoppingBag, Heart, Settings, LogOut, Check } from 'lucide-react'

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
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

  // Mock user statistics
  const userStats = {
    totalOrders: 24,
    totalBooks: 47,
    wishlistItems: 12,
    memberSince: '2022-01-15'
  }

  // Mock order history
  const orderHistory = [
    {
      id: 'ORD001',
      date: '2024-03-10',
      total: 1299,
      status: 'Delivered',
      books: [
        { title: 'The Great Adventure', author: 'John Smith', price: 599 },
        { title: 'Mystery Tales', author: 'Jane Doe', price: 700 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-02-28',
      total: 899,
      status: 'Delivered',
      books: [
        { title: 'Science Today', author: 'Dr. Alan', price: 499 },
        { title: 'History Rewritten', author: 'Prof. Mary', price: 400 }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-03-15',
      total: 1599,
      status: 'Processing',
      books: [
        { title: 'Future Tech', author: 'Tech Expert', price: 899 },
        { title: 'AI Revolution', author: 'AI Specialist', price: 700 }
      ]
    }
  ]

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

  const handleAddressChange = (field, value) => {
    setTempProfileData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handlePreferenceChange = (field, value) => {
    setTempProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
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

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

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
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
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
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </motion.label>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 mb-4">{profileData.email}</p>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-3">
                  <Book className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-blue-600">{userStats.totalBooks}</p>
                  <p className="text-xs text-gray-600">Books</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <ShoppingBag className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-600">{userStats.totalOrders}</p>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-3 mb-6">
                <Heart className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-purple-600">{userStats.wishlistItems}</p>
                <p className="text-xs text-gray-600">Wishlist</p>
              </div>

              <div className="text-sm text-gray-500">
                <p>Member since</p>
                <p className="font-semibold text-gray-700">
                  {new Date(userStats.memberSince).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-xl p-2 mt-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </motion.button>
                    ) : (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancel}
                          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-semibold"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-700 mb-4">Basic Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                        <input
                          type="text"
                          value={isEditing ? tempProfileData.firstName : profileData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                            isEditing 
                              ? 'border-blue-200 focus:border-blue-500 bg-white' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={isEditing ? tempProfileData.lastName : profileData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                            isEditing 
                              ? 'border-blue-200 focus:border-blue-500 bg-white' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={isEditing ? tempProfileData.email : profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={isEditing ? tempProfileData.phone : profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            value={isEditing ? tempProfileData.dateOfBirth : profileData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-700 mb-4">Address Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Street Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={isEditing ? tempProfileData.address.street : profileData.address.street}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">City</label>
                          <input
                            type="text"
                            value={isEditing ? tempProfileData.address.city : profileData.address.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">State</label>
                          <input
                            type="text"
                            value={isEditing ? tempProfileData.address.state : profileData.address.state}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Pincode</label>
                          <input
                            type="text"
                            value={isEditing ? tempProfileData.address.pincode : profileData.address.pincode}
                            onChange={(e) => handleAddressChange('pincode', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
                          <input
                            type="text"
                            value={isEditing ? tempProfileData.address.country : profileData.address.country}
                            onChange={(e) => handleAddressChange('country', e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 rounded-xl border-2 transition-colors ${
                              isEditing 
                                ? 'border-blue-200 focus:border-blue-500 bg-white' 
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      Order History
                    </h2>
                    
                    <div className="space-y-4">
                      {orderHistory.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                              <p className="text-xl font-bold text-green-600 mt-2">₹{order.total}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.books.map((book, bookIndex) => (
                              <div key={bookIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                <div>
                                  <p className="font-medium text-gray-800">{book.title}</p>
                                  <p className="text-sm text-gray-600">by {book.author}</p>
                                </div>
                                <p className="font-semibold text-gray-700">₹{book.price}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
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
                    {/* Mock wishlist items */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                          <Book className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Book Title {item}</h3>
                        <p className="text-sm text-gray-600 mb-3">Author Name</p>
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-bold text-green-600">₹{item * 199}</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4">Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">Newsletter Subscription</p>
                            <p className="text-sm text-gray-600">Receive updates about new books and offers</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePreferenceChange('newsletter', !tempProfileData.preferences.newsletter)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              tempProfileData.preferences.newsletter ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          >
                            <motion.div
                              animate={{ x: tempProfileData.preferences.newsletter ? 24 : 0 }}
                              className="w-5 h-5 bg-white rounded-full"
                            />
                          </motion.button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">Push Notifications</p>
                            <p className="text-sm text-gray-600">Get notified about your orders</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePreferenceChange('notifications', !tempProfileData.preferences.notifications)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              tempProfileData.preferences.notifications ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          >
                            <motion.div
                              animate={{ x: tempProfileData.preferences.notifications ? 24 : 0 }}
                              className="w-5 h-5 bg-white rounded-full"
                            />
                          </motion.button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">Dark Mode</p>
                            <p className="text-sm text-gray-600">Toggle dark theme (Coming Soon)</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled
                            className={`w-12 h-6 rounded-full transition-colors bg-gray-300 opacity-50`}
                          >
                            <div className="w-5 h-5 bg-white rounded-full" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4">Security</h3>
                      
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-gray-800">Change Password</span>
                          </div>
                          <span className="text-gray-400">→</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-800">Two-Factor Authentication</span>
                          </div>
                          <span className="text-green-600 text-sm">Enabled</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Success Message */}
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



// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { User, ShoppingBag, Heart, Settings, LogOut, Check } from 'lucide-react'

// // import ProfileSidebar from './ProfileSidebar'
// // import PersonalInfo from './PersonalInfo'
// // import OrderHistory from './OrderHistory'
// // import Wishlist from './Wishlist'

// import PersonalInfo from './components/PersonalInfo'
// import ProfileSidebar from './components/ProfileSidebar'
// import OrderHistory from './components/OrderHistory'
// import Wishlist from './components/Wishlist'


// const ProfileView = () => {
//   const [activeTab, setActiveTab] = useState('personal')
//   const [isEditing, setIsEditing] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')

//   const [profileData, setProfileData] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '+91 98765 43210',
//     dateOfBirth: '1995-06-15',
//     address: {
//       street: '123 Main Street',
//       city: 'Mumbai',
//       state: 'Maharashtra',
//       pincode: '400001',
//       country: 'India'
//     },
//     preferences: {
//       newsletter: true,
//       notifications: true,
//       darkMode: false
//     }
//   })

//   const [tempProfileData, setTempProfileData] = useState(profileData)

//   const userStats = {
//     totalOrders: 24,
//     totalBooks: 47,
//     wishlistItems: 12,
//     memberSince: '2022-01-15'
//   }

//   const orderHistory = [
//     {
//       id: 'ORD001',
//       date: '2024-03-10',
//       total: 1299,
//       status: 'Delivered',
//       books: []
//     },
//     {
//       id: 'ORD002',
//       date: '2024-02-28',
//       total: 899,
//       status: 'Delivered',
//       books: []
//     }
//   ]

//   const tabs = [
//     { id: 'personal', label: 'Personal Info', icon: User },
//     { id: 'orders', label: 'Order History', icon: ShoppingBag },
//     { id: 'wishlist', label: 'Wishlist', icon: Heart },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ]

//   // Handlers
//   const handleEdit = () => {
//     setTempProfileData(profileData)
//     setIsEditing(true)
//   }

//   const handleSave = () => {
//     setProfileData(tempProfileData)
//     setIsEditing(false)
//     setShowSuccess(true)
//     setTimeout(() => setShowSuccess(false), 3000)
//   }

//   const handleCancel = () => {
//     setTempProfileData(profileData)
//     setIsEditing(false)
//   }

//   const handleInputChange = (field, value) => {
//     setTempProfileData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setProfileImage(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b p-4 flex justify-between">
//         <h1 className="text-2xl font-bold">My Profile</h1>
//         <button className="flex items-center gap-2 text-red-500">
//           <LogOut className="w-5 h-5" /> Logout
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-4 gap-8">
        
//         {/* Sidebar */}
//         <ProfileSidebar
//           profileImage={profileImage}
//           setProfileImage={setProfileImage}
//           profileData={profileData}
//           userStats={userStats}
//           tabs={tabs}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           handleImageUpload={handleImageUpload}
//         />

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <AnimatePresence mode="wait">
            
//             {activeTab === 'personal' && (
//               <PersonalInfo
//                 isEditing={isEditing}
//                 profileData={profileData}
//                 tempProfileData={tempProfileData}
//                 handleEdit={handleEdit}
//                 handleSave={handleSave}
//                 handleCancel={handleCancel}
//                 handleInputChange={handleInputChange}
//               />
//             )}

//             {activeTab === 'orders' && (
//               <OrderHistory orderHistory={orderHistory} />
//             )}

//             {activeTab === 'wishlist' && <Wishlist />}

//             {activeTab === 'settings' && (
//               <div className="bg-white p-6 rounded-xl shadow">
//                 Settings (same as before — you can extract later)
//               </div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Success Toast */}
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl"
//           >
//             <Check className="inline mr-2" />
//             Profile updated successfully!
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default ProfileView