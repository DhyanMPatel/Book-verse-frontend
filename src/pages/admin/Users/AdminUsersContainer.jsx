import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import AdminUsersView from "./AdminUsersView";

const AdminUsersContainer = () => {
  const [userList, setUserList] = useState([]);

  const handleView = (row) => {
    console.log("View user:", row);
  };

  const handleEdit = (row) => {
    console.log("Edit user:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete user:", row);
  };

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
      <AdminUsersView
        userList={userList}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AdminUsersContainer;
