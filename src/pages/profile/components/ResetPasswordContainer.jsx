import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../../services/axiosInstance'
import Swal from 'sweetalert2'
import ResetPasswordView from './ResetPasswordView'

const ResetPasswordContainer = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required'),

    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/\d/, 'Must contain at least one number')
      .matches(/[@$!%*?&]/, 'Must contain at least one special character (@$!%*?&)')
      .notOneOf(
        [Yup.ref('currentPassword')],
        'New password must be different from current password'
      )
      .required('New password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required')
  })

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      await axiosInstance.put('/user/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })

      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Password changed successfully!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      })
      
      resetForm()

    } catch (error) {
      console.error('Error changing password:', error)

      const status = error.response?.status
      const message = error.response?.data?.message || 'Failed to change password'

      if (status === 401) {
        setFieldError('currentPassword', 'Current password is incorrect')
        
        await Swal.fire({
          icon: 'error',
          title: 'Incorrect Password',
          text: message || 'Current password is incorrect',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#d33'
        })
      } else if (status === 400) {
        await Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: message,
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        })
      } else if (status === 404) {
        await Swal.fire({
          icon: 'error',
          title: 'User Not Found',
          text: message || 'User not found',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        })
      } else if (status === 500) {
        await Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: message || 'Internal Server Error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        })
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message || 'Something went wrong. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        })
      }

    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <ResetPasswordView
          formikProps={formikProps}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      )}
    </Formik>
  )
}

export default ResetPasswordContainer