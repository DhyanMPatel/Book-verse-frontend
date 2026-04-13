import React from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FcFullTrash } from "react-icons/fc";
import DataTableContainer from "../../../common/DataTable/DataTableContainer";
import "./AdminCouponStyle.css";

const AdminCouponView = ({
  handleView,
  handleEdit,
  handleDelete,
  couponList,
  handleAddCouponModal,
}) => {
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
      key: "couponCode",
      label: "Coupon Code",
      cell: (row) => (
        <div
          className="coupon-code-cell text-uppercase"
          style={{ textAlign: "left" }}
        >
          {row?.couponCode || "--"}
        </div>
      ),
    },
    {
      key: "discountType",
      label: "Discount Type",
      cell: (row) => (
        <span
          className={`coupon-type-cell ${row?.discountType?.toLowerCase() || ""}`}
        >
          {row?.discountType || "--"}
        </span>
      ),
    },
    {
      key: "discount",
      label: "Discount",
      cell: (row) => (
        <span className={`coupon-type-cell`}>
          {row?.discountType === "percentage"
            ? `${row?.discount || 0}%`
            : `₹${row?.discount || 0}`}
        </span>
      ),
    },
    {
      key: "categoryId",
      label: "Category",
      cell: (row) => (
        <span className="coupon-type-cell">
          {row?.categoryId?.name || "--"}
        </span>
      ),
    },
    {
      key: "usageLimit",
      label: "Usage Limit",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {row?.usageLimit || "--"}
        </div>
      ),
    },
    {
      key: "timesUsed",
      label: "Times Used",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {row?.timesUsed || 0}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      cell: (row) => {
        const isExpired = new Date(row?.validTillDate) < new Date();
        const isLimitReached = row?.usageLimit && row?.timesUsed >= row?.usageLimit;
        const isActive = !isExpired && !isLimitReached;
        return (
          <div>
            {isActive ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">{isExpired ? "Expired" : "Limit Reached"}</span>
            )}
          </div>
        );
      },
    },
    {
      key: "validTillDate",
      label: "Valid Till",
      cell: (row) => (
        <div style={{ textAlign: "left" }}>
          {row?.validTillDate
            ? new Date(row.validTillDate).toLocaleDateString("en-IN")
            : "--"}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-coupons-container">
      <div className="card admin-coupons-card">
        <div className="card-body">
          <div className="admin-coupons-header">
            <h2 className="admin-coupons-title">Coupons List</h2>
            <Button
              type="button"
              className="btn-add-coupon"
              onClick={() => {
                handleAddCouponModal();
              }}
            >
              <FaPlus />
              Add Coupon
            </Button>
          </div>
          <div className="table-wrapper">
            <DataTableContainer
              data={Array.isArray(couponList) ? couponList : []}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponView;
