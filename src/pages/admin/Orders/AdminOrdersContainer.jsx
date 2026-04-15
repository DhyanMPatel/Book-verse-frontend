import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import AdminOrdersView from "./AdminOrdersView";
import ViewOrder from "./component/ViewOrder";
import Swal from "sweetalert2";

const AdminOrdersContainer = () => {
  const [orderList, setOrderList] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId"); // or from auth

  // Fetch orders - using static data for testing
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      const response = await axiosInstance.get("/order/user-orders");
      const orders = response?.data?.data || [];
      console.log("Fetched orders:", orders);
      
      setOrderList(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      Swal.fire("Error", "Failed to load orders", "error");
      setOrderList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

const handleView = (row) => {
  try {
    console.log("Selected Order:", row);

    const formattedOrder = {
      ...row,
      id: row.id || row._id,
    };

    setSelectedOrder(formattedOrder);
    setIsViewModalOpen(true);
  } catch (error) {
    console.error("❌ Failed to load order view:", error);
    Swal.fire("Error", "Failed to load order details", "error");
  }
};


  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <AdminOrdersView
        orderList={orderList}
        handleView={handleView}
        loading={loading}
      />
      <ViewOrder
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        orderData={selectedOrder}
      />
    </>
  );
};

export default AdminOrdersContainer;