import React, { useState } from 'react'
import LibraryView from './libraryView'

const LibraryContainer = () => {
  // Mock data for purchased books
  const [purchasedBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      purchasedDate: "2024-03-15",
      cover: null,
      format: "PDF",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      purchasedDate: "2024-03-18",
      cover: null,
      format: "PDF",
      fileSize: "1.8 MB"
    },
    {
      id: 3,
      title: "Psychology of Money",
      author: "Morgan Housel",
      purchasedDate: "2024-03-20",
      cover: null,
      format: "PDF",
      fileSize: "3.1 MB"
    },
    {
      id: 4,
      title: "Clean Code",
      author: "Robert Martin",
      purchasedDate: "2024-03-22",
      cover: null,
      format: "PDF",
      fileSize: "4.5 MB"
    },
    {
      id: 5,
      title: "Zero to One",
      author: "Peter Thiel",
      purchasedDate: "2024-03-25",
      cover: null,
      format: "PDF",
      fileSize: "2.1 MB"
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Harari",
      purchasedDate: "2024-03-28",
      cover: null,
      format: "PDF",
      fileSize: "5.2 MB"
    }
  ])

  // Stats for the library
  const stats = {
    totalBooks: purchasedBooks.length,
    totalFormats: [...new Set(purchasedBooks.map(b => b.format))].length,
    totalSize: purchasedBooks.reduce((acc, book) => acc + parseFloat(book.fileSize), 0).toFixed(1) + " MB"
  }

  // Handlers
  const handleDownload = (bookId) => {
    console.log(`Downloading book ${bookId}`)
    // Download logic here
  }

  const handleRead = (bookId) => {
    console.log(`Reading book ${bookId}`)
    // Open book reader logic here
  }

  return (
    <LibraryView 
      books={purchasedBooks}
      stats={stats}
      onDownload={handleDownload}
      onRead={handleRead}
    />
  )
}

export default LibraryContainer