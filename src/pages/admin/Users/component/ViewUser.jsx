// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "../AdminUsersStyle.css";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../../../services/axiosInstance";

// const ViewUser = ({ isOpen, onClose, userData }) => {
//   if (!isOpen || !userData) return null;

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const [stats, setStats] = useState({
//   wishlist: 0,
//   cart: 0,
//   orders: 0,
// });


// useEffect(() => {
//   const fetchUserStats = async () => {
//     try {
//       const [wishlistRes, orderRes, cartRes] = await Promise.all([
//         axiosInstance.get("/wishlist/get"),
//         axiosInstance.get(`/purchased-books/${userData._id}`),
//         axiosInstance.get("/cart/get"),
//       ]);

//       setStats({
//         wishlist: wishlistRes.data?.length || 0,
//         orders: orderRes.data?.length || 0,
//         cart: cartRes.data?.length || 0,
//       });

//       console.log("wishlist:", wishlistRes.data);
// console.log("orders:", orderRes.data);
// console.log("cart:", cartRes.data);

//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   if (userData?._id) {
//     fetchUserStats();
//   }
// }, [userData]);


//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={onClose}
//         />

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.95, y: 20 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
//         >
//           {/* Header */}
//           <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
//                   <p className="text-sm text-gray-500">View complete user information</p>
//                 </div>
//               </div>
//               <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
//                 <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-6 min-h-0 bg-gray-50">
//             <div className="space-y-6">
              
//               {/* User Profile */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   Profile Information
//                 </h3>

//                 <div className="flex flex-col md:flex-row gap-6">
//                   {/* Avatar */}
//                   <div className="shrink-0">
//                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
//                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
//                         {userData.name ? userData.name.charAt(0).toUpperCase() : "?"}
//                       </div>
//                       <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${userData.isActive ? "bg-green-500" : "bg-gray-400"}`} />
//                     </motion.div>
//                   </div>

//                   {/* User Info Grid */}
//                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <InfoItem label="Name" value={userData.name} />
//                     <InfoItem label="Email" value={userData.email} />
//                     <InfoItem label="Phone" value={userData.phone || userData.mobile} />
//                     <InfoItem label="Role" value={userData.role || "User"} />
//                     <InfoItem label="Status" value={userData.isActive ? "Active" : "Inactive"} />
//                     <InfoItem label="Joined Date" value={formatDate(userData.createdAt)} />
//                   </div>
//                 </div>

//                 {/* Address */}
//                 {(userData.address || userData.city || userData.state || userData.country) && (
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
//                     <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm">
//                       {userData.address && <p>{userData.address}</p>}
//                       {(userData.city || userData.state) && (
//                         <p>{[userData.city, userData.state].filter(Boolean).join(", ")}</p>
//                       )}
//                       {(userData.country || userData.pincode) && (
//                         <p>{[userData.country, userData.pincode].filter(Boolean).join(" - ")}</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Activity Stats */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                   Activity Statistics
//                 </h3>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <StatCard label="Total Orders" value={stats.orders} color="blue" />
//                   <StatCard label="Wishlist Items" value={stats.wishlist} color="purple" />
//                   <StatCard label="Cart Items" value={stats.cart} color="green" />
//                 </div>
//               </div>

//               {/* Account Info */}
//               <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Account Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <span className="text-gray-500">User ID:</span>
//                     <span className="ml-2 font-medium font-mono text-xs">{userData.id || userData._id || "N/A"}</span>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <span className="text-gray-500">Last Updated:</span>
//                     <span className="ml-2 font-medium">{formatDateTime(userData.updatedAt)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="border-t border-gray-200 bg-gray-50 p-6 shrink-0">
//             <div className="flex justify-end">
//               <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                 Close
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// const InfoItem = ({ label, value }) => (
//   <div className="bg-gray-50 rounded-lg p-3">
//     <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
//     <span className="text-sm font-medium text-gray-800">{value || "N/A"}</span>
//   </div>
// );

// const StatCard = ({ label, value, color }) => {
//   const colorClasses = {
//     blue: "bg-blue-50 text-blue-600",
//     purple: "bg-purple-50 text-purple-600",
//     green: "bg-green-50 text-green-600",
//   };
  
//   return (
//     <div className={`rounded-lg p-4 text-center ${colorClasses[color] || "bg-gray-50 text-gray-600"}`}>
//       <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
//       <span className="text-2xl font-bold">{value}</span>
//     </div>
//   );
// };

// export default ViewUser;


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../AdminUsersStyle.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../services/axiosInstance";

const ViewUser = ({ isOpen, onClose, userData }) => {
  
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState({
    wishlist: 0,
    cart: 0,
    orders: 0,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!userData?._id) return;
      
      setLoadingStats(true);
      try {
        const res = await axiosInstance.get(
          `/admin/user-stats/${userData._id}`
        );
        console.log("Fetched user stats:", res.data);
        setStats({
          wishlist: res.data?.wishlist || 0,
          orders: res.data?.orders || 0,
          cart: res.data?.cart || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep default values on error
        setStats({
          wishlist: 0,
          cart: 0,
          orders: 0,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [userData?._id]);
  if (!isOpen || !userData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                  <p className="text-sm text-gray-500">View complete user information</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0 bg-gray-50">
            <div className="space-y-6">
              
              {/* User Profile */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile Information
                </h3>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${userData.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                    </motion.div>
                  </div>

                  {/* User Info Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label="Name" value={userData.name} />
                    <InfoItem label="Email" value={userData.email} />
                    <InfoItem label="Phone" value={userData.phone || userData.mobile} />
                    <InfoItem label="Role" value={userData.role || "User"} />
                    <InfoItem label="Status" value={userData.isActive ? "Active" : "Inactive"} />
                    <InfoItem label="Joined Date" value={formatDate(userData.createdAt)} />
                  </div>
                </div>

                {/* Address */}
                {(userData.address || userData.city || userData.state || userData.country) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm">
                      {userData.address && <p>{userData.address}</p>}
                      {(userData.city || userData.state) && (
                        <p>{[userData.city, userData.state].filter(Boolean).join(", ")}</p>
                      )}
                      {(userData.country || userData.pincode) && (
                        <p>{[userData.country, userData.pincode].filter(Boolean).join(" - ")}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Stats */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Activity Statistics
                  {loadingStats && (
                    <span className="ml-2 text-xs text-gray-400">Loading...</span>
                  )}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <StatCard 
                    label="Total Orders" 
                    value={stats.orders} 
                    color="blue" 
                    loading={loadingStats}
                  />
                  <StatCard 
                    label="Wishlist Items" 
                    value={stats.wishlist} 
                    color="purple" 
                    loading={loadingStats}
                  />
                  <StatCard 
                    label="Cart Items" 
                    value={stats.cart} 
                    color="green" 
                    loading={loadingStats}
                  />
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">User ID:</span>
                    <span className="ml-2 font-medium font-mono text-xs">{userData.id || userData._id || "N/A"}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="ml-2 font-medium">{formatDateTime(userData.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6 shrink-0">
            <div className="flex justify-end">
              <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3">
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <span className="text-sm font-medium text-gray-800">{value || "N/A"}</span>
  </div>
);

const StatCard = ({ label, value, color, loading }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
  };
  
  return (
    <div className={`rounded-lg p-4 text-center ${colorClasses[color] || "bg-gray-50 text-gray-600"}`}>
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {loading ? (
        <div className="flex justify-center items-center h-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
        </div>
      ) : (
        <span className="text-2xl font-bold">{value}</span>
      )}
    </div>
  );
};

export default ViewUser;