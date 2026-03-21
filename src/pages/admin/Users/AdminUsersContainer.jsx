import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import AdminUsersView from "./AdminUsersView";

const AdminUsersContainer = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUserList(response?.data?.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <AdminUsersView userList={userList} />
    </>
  );
};

export default AdminUsersContainer;
