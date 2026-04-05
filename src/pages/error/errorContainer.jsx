import React, { useState } from 'react'
import ErrorView from './errorView'
import './errorStyle.css'

const ErrorContainer = () => {
  const [errorCode] = useState(404)
  const [errorMessage] = useState("Page Not Found")
  const [errorDescription] = useState("The page you're looking for doesn't exist or has been moved.")

  // Navigation handlers
  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <ErrorView 
      errorCode={errorCode}
      errorMessage={errorMessage}
      errorDescription={errorDescription}
      onGoHome={handleGoHome}
      onGoBack={handleGoBack}
    />
  )
}

export default ErrorContainer
