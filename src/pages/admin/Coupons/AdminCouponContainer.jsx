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

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleAddCouponModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCouponAction = async (action, data = null, id = null) => {
    try {
      switch (action) {
        case "view": {
          const response = await axiosInstance.get(`/coupons/${id || data.id || data._id}`);
          const couponData = response?.data?.data;

          if (!couponData) {
            Swal.fire("Error", "Coupon details not found", "error");
            return;
          }

          setSelectedCoupon(couponData);
          setIsViewModalOpen(true);
          break;
        }

        case "edit": {
          const response = await axiosInstance.get(`/coupons/${id || data._id || data.id}`);
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
          break;
        }

        case "create": {
          await axiosInstance.post("/coupons/create", data);

          Swal.fire({
            icon: "success",
            title: "Coupon Created!",
            timer: 1500,
            showConfirmButton: false,
          });

          await fetchCoupons();
          handleCloseModal();
          break;
        }

        case "update": {
          if (!selectedCoupon?.id) {
            console.error("No coupon selected");
            return;
          }

          const response = await axiosInstance.patch(
            `/coupons/update/${selectedCoupon.id}`,
            data
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
          break;
        }

        case "delete": {
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

          const couponId = id || data?._id || data?.id;

          if (!couponId) {
            console.error("Coupon ID missing:", data);
            return;
          }

          await axiosInstance.delete(`/coupons/delete/${couponId}`);

          setCouponList((prev) => prev.filter((coupon) => (coupon._id || coupon.id) !== couponId));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Coupon has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
          break;
        }

        default:
          console.error("Unknown action:", action);
      }
    } catch (error) {
      console.error(`${action} error:`, error);

      Swal.fire(
        "Error",
        error?.response?.data?.message || `Failed to ${action} coupon`,
        "error"
      );
    }
  };

  return (
    <>
      <AdminCouponView
        couponList={couponList}
        handleView={(row) => handleCouponAction("view", row)}
        handleEdit={(row) => handleCouponAction("edit", row)}
        handleDelete={(row) => handleCouponAction("delete", row)}
        handleAddCouponModal={handleAddCouponModal}
      />
      <CreateCoupon
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(formData) => handleCouponAction("create", formData)}
      />
      <UpdateCoupon
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={(formData) => handleCouponAction("update", formData)}
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
