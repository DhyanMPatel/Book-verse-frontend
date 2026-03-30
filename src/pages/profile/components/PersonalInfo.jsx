import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Save, X, Mail, Phone, Calendar, MapPin } from 'lucide-react'

const PersonalInfo = ({
  isEditing,
  profileData,
  tempProfileData,
  handleEdit,
  handleSave,
  handleCancel,
  handleInputChange,
  handleAddressChange,
  
}) => {
  return (
    <motion.div
      key="personal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
    >
      {/* Header */}
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

      <div className="grid  gap-6">

        {/* Basic Info */}
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
              className={`w-full px-4 py-2 rounded-xl border-2 ${
                isEditing ? 'border-blue-200 focus:border-blue-500' : 'border-gray-200 bg-gray-50'
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
                className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 ${
                  isEditing ? 'border-blue-200 focus:border-blue-500' : 'border-gray-200 bg-gray-50'
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
                className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 ${
                  isEditing ? 'border-blue-200 focus:border-blue-500' : 'border-gray-200 bg-gray-50'
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
                className={`w-full pl-10 pr-4 py-2 rounded-xl border-2 ${
                  isEditing ? 'border-blue-200 focus:border-blue-500' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Address */}
         {/* <div className="space-y-4">
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
                    </div> */}
      </div>
    </motion.div>
  )
}

export default PersonalInfo