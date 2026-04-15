import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Save, Loader2 } from 'lucide-react'
import { Form, Field, ErrorMessage } from 'formik'

const ResetPasswordView = ({
  formikProps,
  showPassword,
  toggleShowPassword
}) => {
  const { isSubmitting, errors, touched } = formikProps

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Lock className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-600">Change your account password</p>
        </div>
      </div>

      <Form className="space-y-5 max-w-md">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <Field
              id="currentPassword"
              name="currentPassword"
              type={showPassword.current ? 'text' : 'password'}
              className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.currentPassword && touched.currentPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <ErrorMessage name="currentPassword">
            {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
          </ErrorMessage>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <Field
              id="newPassword"
              name="newPassword"
              type={showPassword.new ? 'text' : 'password'}
              className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.newPassword && touched.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('new')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
          <ErrorMessage name="newPassword">
            {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
          </ErrorMessage>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword.confirm ? 'text' : 'password'}
              className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword('confirm')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <ErrorMessage name="confirmPassword">
            {msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
          </ErrorMessage>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSubmitting ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </Form>
    </motion.div>
  )
}

export default ResetPasswordView
