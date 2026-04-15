import React, { useState, useEffect } from 'react'
import ProfileView from './profileView'
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from '../../services/axiosInstance';
import { User, ShoppingBag, Heart, Lock } from 'lucide-react';
import { toast } from 'react-toastify';

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

  // Order history state (fetched dynamically)
  const [orderHistory, setOrderHistory] = useState([]);

  // Get userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        const userData = res.data?.data;
        if (userData) {
          setProfileData({
            firstName: userData.firstName || userData.name?.split(' ')[0] || '',
            lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
            email: userData.email || '',
            phone: userData.phone || '',
            dateOfBirth: userData.dateOfBirth || '',
            preferences: userData.preferences || {
              newsletter: true,
              notifications: true,
              darkMode: false
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to localStorage user data
        if (user) {
          setProfileData(prev => ({
            ...prev,
            firstName: user.firstName || user.name?.split(' ')[0] || prev.firstName,
            lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || prev.lastName,
            email: user.email || prev.email
          }));
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch stats and orders — uses allSettled so one 404 doesn't break everything
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const [wishlistRes, cartRes, ordersRes] = await Promise.allSettled([
          axiosInstance.get('/wishlist/get'),
          axiosInstance.get(`cart/cart/${userId}`),
          axiosInstance.get(`order/orders/${userId}`)
        ]);

        // Handle orders response
        if (ordersRes.status === 'fulfilled') {
          const orders = ordersRes.value.data?.data || ordersRes.value.data || [];
          
          setOrderHistory(
            orders.map(order => ({
              id: order._id,
              date: order.createdAt,
              total: order.totalAmount,
              status: order.status,
              books: order.items || []
            }))
          );
        }

        // Handle stats
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

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Tabs use actual lucide components, not strings
  // Filter tabs based on user role - admin only sees Personal Info and Reset Password
  const allTabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'resetpassword', label: 'Reset Password', icon: Lock },
  ]

  // Admin sees personal info and reset password
  const adminTabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'resetpassword', label: 'Reset Password', icon: Lock },
  ]

  const tabs = isAdmin?.() ? adminTabs : allTabs
  
  // Debug: log tabs to verify
  console.log('Tabs:', tabs, 'isAdmin:', isAdmin?.())

  // Handlers
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  const handleEdit = () => {
    setTempProfileData(profileData)
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      // Call API to update user profile
      await axiosInstance.put('/user/update-profile', {
        firstName: tempProfileData.firstName,
        lastName: tempProfileData.lastName,
        phone: tempProfileData.phone,
        dateOfBirth: tempProfileData.dateOfBirth,
        preferences: tempProfileData.preferences
      });

      // Update local state with saved data
      setProfileData(tempProfileData);
      
      // Update localStorage user data as well
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...currentUser,
        firstName: tempProfileData.firstName,
        lastName: tempProfileData.lastName,
        name: `${tempProfileData.firstName} ${tempProfileData.lastName}`.trim()
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
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