import AdminCouponView from "./AdminCouponView";
import axiosInstance from "../../../services/axiosInstance";
import { useEffect, useState } from "react";
import CreateCoupon from "./Component/CreateCoupon";
import Swal from "sweetalert2";
import UpdateCoupon from "./Component/UpdateCoupon";
import ViewCoupon from "./Component/ViewCoupon";

const AdminCouponContainer = () => {
  const [couponList, setCouponList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Fetch Coupons
  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get("/coupons/list");
      const coupons = response?.data?.data?.coupons;

      // Ensure it's always an array
      setCouponList(Array.isArray(coupons) ? coupons : []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setCouponList([]); // fallback
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleView = async (row) => {
    try {
      const response = await axiosInstance.get(`/coupons/${row.id || row._id}`);
      const couponData = response?.data?.data;

      if (!couponData) {
        Swal.fire("Error", "Coupon details not found", "error");
        return;
      }

      setSelectedCoupon(couponData);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch coupon details:", error);
      Swal.fire("Error", "Failed to load coupon details", "error");
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleEdit = async (row) => {
    try {
      const response = await axiosInstance.get(`/coupons/${row._id || row.id}`);
      const couponData = response?.data?.data;

      setSelectedCoupon({
        id: couponData._id || couponData.id,
        couponCode: couponData.couponCode,
        discountType: couponData.discountType,
        discount: couponData.discount,
        categoryId: couponData.categoryId,
        usageLimit: couponData.usageLimit,
        validTillDate: couponData.validTillDate,
        description: couponData.description,
      });

      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch coupon details:", error);
      Swal.fire("Error", "Failed to load coupon details for editing", "error");
    }
  };

  const handleUpdateCoupon = async (formData) => {
    try {
      if (!selectedCoupon?.id) {
        console.error("No coupon selected");
        return;
      }

      const response = await axiosInstance.patch(
        `/coupons/update/${selectedCoupon.id}`,
        formData
      );
      console.log("Update response:", response.data.data);

      Swal.fire({
        icon: "success",
        title: "Coupon Updated!",
        text: response?.data?.message || "Coupon updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      await fetchCoupons();
      handleCloseEditModal();
    } catch (error) {
      console.error("Update error:", error);

      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to update coupon",
        "error"
      );
    }
  };

  const handleDelete = async (row) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This coupon will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      // Get correct ID
      const couponId = row?._id || row?.id;

      if (!couponId) {
        console.error("Coupon ID missing:", row);
        return;
      }

      // API call
      await axiosInstance.delete(`/coupons/delete/${couponId}`);

      // Update UI instantly
      setCouponList((prev) => prev.filter((coupon) => (coupon._id || coupon.id) !== couponId));

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Coupon has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete failed:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete coupon",
      });
    }
  };

  const handleAddCouponModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCoupon = async (formData) => {
    try {
      await axiosInstance.post("/coupons/create", formData);

      Swal.fire({
        icon: "success",
        title: "Coupon Created!",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchCoupons(); // refresh list
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create coupon", "error");
    }
  };

  return (
    <>
      <AdminCouponView
        couponList={couponList}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleAddCouponModal={handleAddCouponModal}
      />
      <CreateCoupon
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateCoupon}
      />
      <UpdateCoupon
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateCoupon}
        couponData={selectedCoupon}
      />
      <ViewCoupon
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        couponData={selectedCoupon}
      />
    </>
  );
};

export default AdminCouponContainer;
