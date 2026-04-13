import React from "react";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa6";
import DataTableContainer from "../../../common/DataTable/DataTableContainer";
import "./AdminOrdersStyle.css";

const AdminOrdersView = ({ orderList, handleView, loading, onRefresh }) => {
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
          <div className="order-customer-cell text-capitalize">
            {row.userId?.name || row.userName || "--"}
          </div>
          <div className="order-email-cell">
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
          <span className="order-items-cell">
            {row.items?.length || 0} {row.items?.length === 1 ? "book" : "books"}
          </span>
        </div>
      ),
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          <span className="order-customer-cell">
            ₹{row.totalAmount || 0}
          </span>
          <div className="order-email-cell">
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
            <span className="order-email-cell font-mono">
              {row.razorpayPaymentId.substring(0, 15)}...
            </span>
          ) : (
            <span className="order-email-cell">Pending</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Order Date",
      cell: (row) => (
        <div className="order-customer-cell" style={{ textAlign: "left" }}>
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
            <div className="d-flex align-items-center gap-3">
              <div className="text-gray-500 text-sm">
                Total Orders: {orderList.length}
              </div>
              {onRefresh && (
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={onRefresh}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : orderList.length === 0 ? (
            <div className="text-center py-5">
              <div className="text-gray-500 mb-3">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h5 className="text-gray-600">No orders found</h5>
              <p className="text-gray-500 text-sm mt-1">
                {onRefresh ? 'Click Refresh to try again' : 'Check console for API response'}
              </p>
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
