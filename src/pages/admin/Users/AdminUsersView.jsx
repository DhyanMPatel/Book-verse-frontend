import { Button } from "react-bootstrap";
import { FaEye, FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FcFullTrash } from "react-icons/fc";
import DataTableContainer from "../../../common/DataTable/DataTableContainer";
import "./AdminUsersStyle.css";

const AdminUsersView = (props) => {
  const { handleView, handleEdit, handleDelete, userList, handleAddUserModal } =
    props;

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
      key: "name",
      label: "Name",
      cell: (row) => (
        <div
          className="user-name-cell text-capitalize"
          style={{ textAlign: "left" }}
        >
          {row?.name || "--"}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      cell: (row) => (
        <div className="user-email-cell" style={{ textAlign: "left" }}>
          {row?.email || "--"}
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      cell: (row) => (
        <span className={`user-role-cell ${row?.role?.toLowerCase() || ""}`}>
          {row?.role || "--"}
        </span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>{row?.phone || "--"}</div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      cell: (row) => (
        <div>
          {row?.isActive ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-users-container">
      <div className="card admin-users-card">
        <div className="card-body">
          <div className="admin-users-header">
            <h2 className="admin-users-title">User List</h2>
            <Button
              type="button"
              className="btn-add-user"
              onClick={handleAddUserModal}
            >
              <FaPlus />
              Add User
            </Button>
          </div>
          {/* <SearchFilters
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            handleItemsPerPageChange={handleItemsPerPageChange}
          /> */}
          <div className="table-wrapper">
            <DataTableContainer data={userList} columns={columns} />
          </div>
        </div>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={users ? Math.ceil(totalPages / itemsPerPage) : 0}
          onPageChange={handlePageChange}
        /> */}
      </div>
    </div>
  );
};

export default AdminUsersView;
