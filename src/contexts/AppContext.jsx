import React from 'react'
import { AuthProvider } from './AuthContext'
import { BooksProvider } from './BookContext'
import { ReviewProvider } from './ReviewContext'

const AppContext = ({children}) => {
  return (
    <>
        <AuthProvider>
            <BooksProvider>
                <ReviewProvider>
                    {children}
                </ReviewProvider>
            </BooksProvider>
        </AuthProvider>
    </>
  )
}

export default AppContext
