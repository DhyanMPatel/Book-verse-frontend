// import React, { useState,useEffect } from 'react'
// import ProfileView from './profileView'
// import { useAuth } from "../../hooks/useAuth";
// import axiosInstance from '../../services/axiosInstance';

// const ProfileContainer = () => {
//   // Tab state
//   const [activeTab, setActiveTab] = useState('personal')
  
//   // Edit mode state
//   const [isEditing, setIsEditing] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
  
//   // Profile image state
//   const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')
  
//   // Auth
//   const { logout } = useAuth();
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

//   // Profile data state
  
//   const [profileData, setProfileData] = useState({
//     firstName: 'Nisarg',
//     lastName: 'patel',
//     email: 'nisargpatel@gmail.com',
//     phone: '+91 98765 43210',
//     dateOfBirth: '1995-06-15',
//     preferences: {
//       newsletter: true,
//       notifications: true,
//       darkMode: false
//     }
//   })

//   const [tempProfileData, setTempProfileData] = useState(profileData)

//    // starts for totalBooks, totalOrders, wishlistItems, memberSince
//   const [userStats, setUserStats] = useState({
//   totalOrders: 0,
//   totalBooks: 0,
//   wishlistItems: 0,
//   memberSince: ''
// });

//   // Order history (static for now)
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




// useEffect(() => {
//   const fetchUserStats = async () => {
//     try {
//       // ✅ Individual try-catch so one failure doesn't kill everything
//       const [wishlistRes, cartRes, ordersRes] = await Promise.allSettled([
//         axiosInstance.get('/wishlist/get'),
//         axiosInstance.get('/cart/get'),
//         axiosInstance.get('/orders/user-orders'),  // fix route when ready
//       ]);

//       setUserStats({
//         wishlistItems: wishlistRes.status === 'fulfilled'
//           ? wishlistRes.value.data?.data?.books?.length || 0
//           : 0,
//         totalBooks: cartRes.status === 'fulfilled'
//           ? cartRes.value.data?.data?.items?.length || 0
//           : 0,
//         totalOrders: ordersRes.status === 'fulfilled'
//           ? ordersRes.value.data?.data?.length || 0
//           : 0,
//         memberSince: profileData.dateOfBirth,
//       });

//     } catch (error) {
//       console.error("Error fetching user stats:", error);
//     }
//   };

//   fetchUserStats();
// }, []);




//   // Tabs configuration
//   const tabs = [
//     { id: 'personal', label: 'Personal Info', icon: 'User' },
//     { id: 'orders', label: 'Order History', icon: 'ShoppingBag' },
//     { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
//   ]

//   // Handlers
//   const handleLogout = () => {
//     logout();
//     setProfileDropdownOpen(false);
//   };

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
//     <ProfileView
//       activeTab={activeTab}
//       setActiveTab={setActiveTab}
//       isEditing={isEditing}
//       showSuccess={showSuccess}
//       profileImage={profileImage}
//       profileData={profileData}
//       tempProfileData={tempProfileData}
//       userStats={userStats}
//       orderHistory={orderHistory}
//       tabs={tabs}
//       handleLogout={handleLogout}
//       handleEdit={handleEdit}
//       handleSave={handleSave}
//       handleCancel={handleCancel}
//       handleInputChange={handleInputChange}
//       handleImageUpload={handleImageUpload}
//     />
//   )
// }

// export default ProfileContainer



import React, { useState, useEffect } from 'react'
import ProfileView from './profileView'
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from '../../services/axiosInstance';
import { User, ShoppingBag, Heart } from 'lucide-react'; // ✅ import actual components

const ProfileContainer = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('personal')

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Profile image state
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150')

  // Auth
  const { logout, isAdmin } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: 'Nisarg',
    lastName: 'patel',
    email: 'nisargpatel@gmail.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-06-15',
    preferences: {
      newsletter: true,
      notifications: true,
      darkMode: false
    }
  })

  const [tempProfileData, setTempProfileData] = useState(profileData)

  // Stats for totalBooks, totalOrders, wishlistItems, memberSince
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalBooks: 0,
    wishlistItems: 0,
    memberSince: ''
  });

  // Order history (static for now)
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

  // ✅ Fetch stats — uses allSettled so one 404 doesn't break everything
  useEffect(() => {
    const fetchUserStats = async () => {
      const [wishlistRes, cartRes, ordersRes] = await Promise.allSettled([
        axiosInstance.get('/wishlist/get'),
        axiosInstance.get('/cart/get'),
        axiosInstance.get('/orders/user-orders'),
      ]);

      setUserStats({
        wishlistItems: wishlistRes.status === 'fulfilled'
          ? wishlistRes.value.data?.data?.books?.length || 0
          : 0,
        totalBooks: cartRes.status === 'fulfilled'
          ? cartRes.value.data?.data?.items?.length || 0
          : 0,
        totalOrders: ordersRes.status === 'fulfilled'
          ? ordersRes.value.data?.data?.length || 0
          : 0,
        memberSince: profileData.dateOfBirth,
      });
    };

    fetchUserStats();
  }, []);

  // ✅ Tabs use actual lucide components, not strings
  // Filter tabs based on user role - admin only sees Personal Info
  const allTabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ]

  const tabs = isAdmin?.() ? allTabs.filter(tab => tab.id === 'personal') : allTabs

  // Handlers
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

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
    <ProfileView
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
      handleLogout={handleLogout}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      isAdmin={isAdmin?.()}
    />
  )
}

export default ProfileContainer