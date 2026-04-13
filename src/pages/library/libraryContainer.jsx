// import React, { useState, useEffect } from 'react'
// import LibraryView from './libraryView'
// import axiosInstance from '../../services/axiosInstance'

// const LibraryContainer = () => {
//   const [purchasedBooks, setPurchasedBooks] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const user = JSON.parse(localStorage.getItem('user')) || {}

//   useEffect(() => {
//     fetchPurchasedBooks()
//   }, [])

//   const fetchPurchasedBooks = async () => {
//     try {
//       setLoading(true)

//       // Step 1 — get all purchased bookIds
//       const response = await axiosInstance.get(`/order/purchased-books/${user._id}`)

//       if (!response.data.success) {
//         setError(response.data.message)
//         return
//       }

//       const purchasedList = response.data.data.purchasedBooks // [{ bookId }]

//       // Step 2 — fetch details for each bookId
//       const bookDetailsPromises = purchasedList.map(item =>
//         axiosInstance.get(`/books/details/${item.bookId}`)
//       )

//       const bookDetailsResponses = await Promise.all(bookDetailsPromises)

//       // Step 3 — map into shape LibraryView expects
//       const books = bookDetailsResponses.map((res, index) => {
//         const book = res.data.data.bookDetailData
//         return {
//           id: book.id,
//           title: book.title,
//           author: book.author,
//           cover: book.coverImage,
//           fileUrl: book.fileUrl,
//           format: book.format || "PDF",
//           purchasedDate: purchasedList[index].purchasedDate || new Date().toISOString(),
//         }
//       })

//       setPurchasedBooks(books)

//     } catch (err) {
//       console.error("Failed to fetch purchased books:", err)
//       setError("Failed to fetch purchased books")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const stats = {
//     totalBooks: purchasedBooks.length,
//   }

//   const handleDownload = (bookId) => {
//     const book = purchasedBooks.find(b => b.id === bookId)
//     if (book?.fileUrl) {
//       window.open(book.fileUrl, '_blank')
//     }
//   }

// // const handleDownload = async (bookId) => {
// //     const book = purchasedBooks.find(b => b.id === bookId)
// //     if (!book?.fileUrl) return

// //     try {
// //       const response = await fetch(book.fileUrl)
// //       const blob = await response.blob()
      
// //       // 👈 force PDF type
// //       const pdfBlob = new Blob([blob], { type: 'application/pdf' })
// //       const blobUrl = window.URL.createObjectURL(pdfBlob)

// //       const link = document.createElement('a')
// //       link.href = blobUrl
// //       link.download = `${book.title || 'book'}.pdf`
// //       document.body.appendChild(link)
// //       link.click()
// //       document.body.removeChild(link)

// //       window.URL.revokeObjectURL(blobUrl)
// //     } catch (err) {
// //       console.error("Download failed:", err)
// //     }
// //   }

//   // const handleRead = (bookId) => {
//   //   const book = purchasedBooks.find(b => b.id === bookId)
//   //   if (book?.fileUrl) {
//   //     window.open(book.fileUrl, '_blank')
//   //   }
//   // }

//     const handleRead = (bookId) => {
//     const book = purchasedBooks.find(b => b.id === bookId)
//     if (book?.fileUrl) {
//       const link = document.createElement('a')
//       link.href = book.fileUrl
//       link.download = book.title || 'book'  // 👈 filename
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//   }}

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>

//   return (
//     <LibraryView
//       books={purchasedBooks}
//       stats={stats}
//       onDownload={handleDownload}
//       onRead={handleRead}
//     />
//   )
// }

// export default LibraryContainer


import React, { useState, useEffect } from 'react'
import LibraryView from './libraryView'
import axiosInstance from '../../services/axiosInstance'

const LibraryContainer = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [downloadingIds, setDownloadingIds] = useState(new Set()) // tracks in-progress downloads

  const user = JSON.parse(localStorage.getItem('user')) || {}

  useEffect(() => {
    fetchPurchasedBooks()
  }, [])

  const fetchPurchasedBooks = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get(`/order/purchased-books/${user._id}`)
      if (!response.data.success) {
        setError(response.data.message)
        return
      }

      const purchasedList = response.data.data.purchasedBooks

      const bookDetailsPromises = purchasedList.map(item =>
        axiosInstance.get(`/books/details/${item.bookId}`)
      )
      const bookDetailsResponses = await Promise.all(bookDetailsPromises)

      const books = bookDetailsResponses.map((res, index) => {
        const book = res.data.data.bookDetailData
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          cover: book.coverImage,
          fileUrl: book.fileUrl,
          format: book.format || 'PDF',
          purchasedDate: purchasedList[index].purchasedDate || new Date().toISOString(),
        }
      })

      setPurchasedBooks(books)
    } catch (err) {
      console.error('Failed to fetch purchased books:', err)
      setError('Failed to fetch purchased books')
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED: calls the auth-protected download endpoint,
  // receives the file as a blob, and triggers a real browser download
  const handleDownload = async (bookId) => {
    if (downloadingIds.has(bookId)) return // prevent duplicate clicks

    const book = purchasedBooks.find(b => b.id === bookId)
    if (!book) return

    setDownloadingIds(prev => new Set(prev).add(bookId))

    try {
      const response = await axiosInstance.get(`/books/download/${bookId}`, {
        responseType: 'blob', // tells axios to treat the response as binary
      })

      // Derive filename from Content-Disposition header if present,
      // otherwise fall back to the book title
      const disposition = response.headers['content-disposition']
      let filename = `${book.title || 'book'}.pdf`
      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/)
        if (match) filename = match[1]
      }

      // Create a temporary object URL and click it — saves to Downloads
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

    } catch (err) {
      console.error('Download failed:', err)
      alert(`Failed to download "${book.title}". Please try again.`)
    } finally {
      setDownloadingIds(prev => {
        const next = new Set(prev)
        next.delete(bookId)
        return next
      })
    }
  }

  const handleRead = (bookId) => {
    const book = purchasedBooks.find(b => b.id === bookId)
    if (book?.fileUrl) {
      window.open(book.fileUrl, '_blank') // opens in new tab for reading
    }
  }

  const stats = { totalBooks: purchasedBooks.length }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <LibraryView
      books={purchasedBooks}
      stats={stats}
      onDownload={handleDownload}
      onRead={handleRead}
      downloadingIds={downloadingIds} // pass this so LibraryView can show a spinner per book
    />
  )
}

export default LibraryContainer