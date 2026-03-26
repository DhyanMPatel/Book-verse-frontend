import AdminBooksView from "./AdminBooksView";
import axiosInstance from "../../../services/axiosInstance";
import { useEffect, useState } from "react";
import CreateBooks from "./Component/CreateBooks";
import Swal from "sweetalert2";
import UpdateBooks from "./Component/UpdateBooks";
// import { Book } from "lucide-react";

const AdminBooksContainer = () => {
   const [bookList, setBookList] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [deletingId, setDeletingId] = useState(null);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedBook, setSelectedBook] = useState(null);

 

  // ✅ Fetch Books
   const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get("/books/all");
    // console.log("ACTUAL DATA:", response?.data?.data?.books);
    const books = response?.data?.data?.books;
    
    // ✅ Ensure it's always an array
    setBookList(Array.isArray(books) ? books : []);

  } catch (error) {
    console.error("Failed to fetch books:", error);
    setBookList([]); // fallback
  }
};

  useEffect(() => {
    fetchBooks();
  }, []);

const handleView = (row) => {
    console.log("View user:", row);
  };

const handleEdit = (row) => {
  console.log("🟢 Selected Book:", row); // debug

  setSelectedBook({ ...row }); // 🔥 force new reference
  setIsEditModalOpen(true);
};

const handleCloseEditModal = () => {
  setIsEditModalOpen(false);
  setSelectedBook(null);
};


const handleUpdateBook = async (formData) => {
  try {
    if (!selectedBook?.id) {
      console.error("❌ No book selected");
      return;
    }

    const response = await axiosInstance.patch(
      `/books/update/${selectedBook.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Book Updated!",
      text: response?.data?.message || "Book updated successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    await fetchBooks(); // ✅ important
    handleCloseEditModal();

  } catch (error) {
    console.error("❌ Update error:", error);

    Swal.fire(
      "Error",
      error?.response?.data?.message || "Failed to update book",
      "error"
    );
  }
};

const handleDelete = async (row) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    // ✅ Get correct ID (important fix)
    const bookId = row?.id;;

    if (!bookId) {
      console.error("❌ Book ID missing:", row);
      return;
    }

    // ✅ API call
    await axiosInstance.delete(`/books/delete/${bookId}`);

    // ✅ Update UI instantly (same as your user logic)
    setBookList((prev) =>
  prev.filter((book) => book.id !== bookId)
);

    // ✅ Success alert
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Book has been deleted.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {
    console.error("Delete failed:", error);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Failed to delete book",
    });
  }
};

const handleAddBooksModal = () => {
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};

const handleCreateBook = async (formData) => {
  try {
    await axiosInstance.post("/books/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire({
      icon: "success",
      title: "Book Created!",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchBooks(); // refresh list
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to create book", "error");
  }
};
  
  
  return (
       <>
      <AdminBooksView
        bookList={bookList}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleAddBooksModal={handleAddBooksModal}
      />
      <CreateBooks
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleCreateBook}
  />
  <UpdateBooks
  isOpen={isEditModalOpen}
  onClose={handleCloseEditModal}
  onSubmit={handleUpdateBook}
  bookData={selectedBook}
/>
  </>
    
  );
};

export default AdminBooksContainer;
