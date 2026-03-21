import React, { useState } from 'react'
import profileView from './profileView'
import ProfileView from './profileView'

const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')

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
    { id: 'personal', label: 'Personal Info' },
    { id: 'orders', label: 'Order History' },
    { id: 'wishlist', label: 'Wishlist' },
  ]

  // handlers
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
      reader.onloadend = () => setProfileImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // animation (same as login)
  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.4 }
    }
  }

  return (
    <ProfileView
      pageVariants={pageVariants}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isEditing={isEditing}
      showSuccess={showSuccess}
      profileImage={profileImage}
      profileData={profileData}
      tempProfileData={tempProfileData}
      userStats={userStats}
      orderHistory={orderHistory}
      tabs={tabs}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
    />
  )
}

export default ProfileContainer