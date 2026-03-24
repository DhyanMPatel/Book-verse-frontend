import React from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FcFullTrash } from "react-icons/fc";
import DataTableContainer from "../../../common/DataTable/DataTableContainer";
import "./AdminBooksStyle.css";

const AdminBooksView = ({
  handleView,
  handleEdit,
  handleDelete,
  bookList,
  handleAddBooksModal,
}) => {
  // const { handleView, handleEdit, handleDelete, bookList, handleAddUserModal } = props; //
  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center table-section-btn">
          <Button
            title="View"
            className="ms-2 common-btn-secondary action-btn"
            size="sm"
            variant="outline-dark"
            onClick={() => handleView(row)}
          >
            <FaEye size={19} color="#1a237e" />
          </Button>
          <Button
            title="Edit"
            className="ms-2 common-btn-secondary action-btn"
            size="sm"
            variant="outline-dark"
            onClick={() => handleEdit(row)}
          >
            <FaPenToSquare size={17} color="#fe9339" />
          </Button>
          <Button
            size="sm"
            className="ms-2 common-btn-secondary action-btn"
            variant="outline-dark"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FcFullTrash size={19} color="#bd081c" />
          </Button>
        </div>
      ),
    },
    {
      key: "title",
      label: "Book Title",
      cell: (row) => (
        <div
          className="user-name-cell text-capitalize"
          style={{ textAlign: "left" }}
        >
          {row?.title || "--"}
        </div>
      ),
    },
    {
      key: "author",
      label: "Author",
      cell: (row) => (
        <div className="user-email-cell" style={{ textAlign: "left" }}>
          {row?.author || "--"}
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      cell: (row) => (
        <span
          className={`user-role-cell ${row?.category?.toLowerCase() || ""}`}
        >
          {row?.category || "--"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      cell: (row) => (
        <span className={`user-role-cell ${(row?.price, "")}`}>
          {row?.price || "--"}
        </span>
      ),
    },
    {
      key: "discount",
      label: "Discount",
      cell: (row) => (
        <span className={`user-role-cell ${(row?.discount, "")}`}>
          {row?.discount || "--"}
        </span>
      ),
    },
    {
      key: "totalReviews",
      label: "Reviews",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>{row?.totalReviews || "--"}</div>
      ),
    },
    // {
    //   key: "isActive",
    //   label: "Status",
    //   cell: (row) => (
    //     <div>
    //       {row?.isActive ? (
    //         <span className="badge bg-success">Active</span>
    //       ) : (
    //         <span className="badge bg-danger">Inactive</span>
    //       )}
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="admin-users-container">
      <div className="card admin-users-card">
        <div className="card-body">
          <div className="admin-users-header">
            <h2 className="admin-users-title">Books List</h2>
            {/* <Button
              type="button"
              className="btn-add-user"
              onClick={handleAddBooksModal}
              
            >
              <FaPlus />
              Add Books
            </Button> */}
            <Button
  type="button"
  className="btn-add-user"
  onClick={() => {
    console.log("BUTTON CLICKED");
    handleAddBooksModal(); // ✅ correct name
  }}
>
  <FaPlus />
  Add Books
</Button>
          </div>
          {/* <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          /> */}
          <div className="table-wrapper">
            {/* <DataTableContainer data={bookList} columns={columns} /> */}
            <DataTableContainer
              data={Array.isArray(bookList) ? bookList : []}
              columns={columns}
            />
          </div>
        </div>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>

    // <div className="table-wrapper">
    //         <DataTableContainer data={userList} columns={columns} />
    //       </div>
  );
};

export default AdminBooksView;
