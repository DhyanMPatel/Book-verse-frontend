import React from 'react'
import RegisterView from './registerView'

const RegisterContainer = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  return (
    <>
     <RegisterView pageVariants={pageVariants} />
    </>
  )
}

export default RegisterContainer
