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

  // Fetch orders - using static data for testing
  const fetchOrders = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await axiosInstance.get("/order/user-orders");
      // const orders = response?.data?.data || [];
      
      // Static sample data for testing
      const sampleOrders = [
        {
          _id: "order001",
          razorpayOrderId: "order_1234567890",
          razorpayPaymentId: "pay_9876543210",
          totalAmount: 599,
          currency: "INR",
          status: "paid",
          userId: {
            _id: "user001",
            name: "John Doe",
            email: "john@example.com",
            phone: "+91 9876543210"
          },
          items: [
            { bookId: "book001", title: "The Great Gatsby", price: 299, quantity: 1 },
            { bookId: "book002", title: "1984", price: 150, quantity: 2 }
          ],
          createdAt: "2024-04-06T10:30:00Z",
          updatedAt: "2024-04-06T10:35:00Z"
        },
        {
          _id: "order002",
          razorpayOrderId: "order_2345678901",
          razorpayPaymentId: null,
          totalAmount: 899,
          currency: "INR",
          status: "pending",
          userId: {
            _id: "user002",
            name: "Jane Smith",
            email: "janenathalal@example.com",
            phone: "+91 9876543211"
          },
          items: [
            { bookId: "book003", title: "To Kill a Mockingbird", price: 399, quantity: 1 },
            { bookId: "book004", title: "Pride and Prejudice", price: 250, quantity: 2 }
          ],
          createdAt: "2024-04-05T15:20:00Z",
          updatedAt: "2024-04-05T15:20:00Z"
        },
        {
          _id: "order003",
          razorpayOrderId: "order_3456789012",
          razorpayPaymentId: "pay_8765432109",
          totalAmount: 450,
          currency: "INR",
          status: "completed",
          userId: {
            _id: "user003",
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+91 9876543212"
          },
          items: [
            { bookId: "book005", title: "The Catcher in the Rye", price: 350, quantity: 1 },
            { bookId: "book006", title: "Lord of the Flies", price: 100, quantity: 1 }
          ],
          createdAt: "2024-04-04T09:15:00Z",
          updatedAt: "2024-04-04T09:20:00Z"
        }
      ];
      
      setOrderList(sampleOrders);
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

  const handleView = async (row) => {
    try {
      console.log("Order data from list:", row);
      console.log("userId in order:", row.userId);
      
      const userId = row.userId?._id || row.userId?.id || row.userId || row.user_id;
      console.log("Extracted userId:", userId);
      
      let userData = {};
      
      // Fetch user details if userId exists
      if (userId) {
        try {
          const userResponse = await axiosInstance.get(`/user/${userId}`);
          userData = userResponse?.data?.data || {};
          console.log("Fetched user data:", userData);
        } catch (err) {
          console.log("User fetch failed, using order data:", err);
        }
      }
      
      // Merge order data with user data
      const enrichedOrderData = {
        ...row,
        id: row.id || row._id,
        userId: {
          ...(typeof row.userId === 'object' ? row.userId : {}),
          ...userData,
        },
      };
      
      console.log("Final enriched data:", enrichedOrderData);
      setSelectedOrder(enrichedOrderData);
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
