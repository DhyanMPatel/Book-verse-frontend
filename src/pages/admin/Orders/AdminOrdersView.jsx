import React from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa6";
import DataTableContainer from "../../../common/DataTable/DataTableContainer";
import "./AdminOrdersStyle.css";

const AdminOrdersView = ({ orderList, handleView, loading }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-warning text-dark",
      paid: "bg-success",
      completed: "bg-success",
      failed: "bg-danger",
    };
    return (
      <span className={`badge ${statusClasses[status] || "bg-secondary"}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="d-flex justify-content-center table-section-btn">
          <Button
            title="View Order"
            className="ms-2 common-btn-secondary action-btn"
            size="sm"
            variant="outline-dark"
            onClick={() => handleView(row)}
          >
            <FaEye size={19} color="#1a237e" />
          </Button>
        </div>
      ),
    },
    {
      key: "user",
      label: "Customer",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <div className="text-capitalize font-medium">
            {row.userId?.name || row.userName || "--"}
          </div>
          <div className="text-xs text-gray-500">
            {row.userId?.email || row.userEmail || ""}
          </div>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {row.items?.length || 0} {row.items?.length === 1 ? "book" : "books"}
        </div>
      ),
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <span className="font-semibold text-gray-800">
            ₹{row.totalAmount || 0}
          </span>
          <div className="text-xs text-gray-500">
            {row.currency || "INR"}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {getStatusBadge(row.status)}
        </div>
      ),
    },
    {
      key: "paymentId",
      label: "Payment ID",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {row.razorpayPaymentId ? (
            <span className="text-xs text-gray-600 font-mono">
              {row.razorpayPaymentId.substring(0, 15)}...
            </span>
          ) : (
            <span className="text-xs text-gray-400">Pending</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Order Date",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {formatDate(row.createdAt)}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-orders-container">
      <div className="card admin-orders-card">
        <div className="card-body">
          <div className="admin-orders-header">
            <h2 className="admin-orders-title">Orders List</h2>
            <div className="text-gray-500 text-sm">
              Total Orders: {orderList.length}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <DataTableContainer
                data={Array.isArray(orderList) ? orderList : []}
                columns={columns}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersView;
