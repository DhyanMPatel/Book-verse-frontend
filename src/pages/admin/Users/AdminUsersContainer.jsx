import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import AdminUsersView from "./AdminUsersView";
import CreateUser from "./component/CreateUser";
import UpdateUser from "./component/UpdateUser";
import ViewUser from "./component/ViewUser";
import Swal from "sweetalert2";

const AdminUsersContainer = () => {
  const [userList, setUserList] = useState([]); // ✅
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = async (row) => {
    try {
      const userId = row.id || row._id;
      const response = await axiosInstance.get(`/user/${userId}`);
      const userData = response?.data?.data;
      
      if (!userData) {
        Swal.fire("Error", "User details not found", "error");
        return;
      }

      setSelectedUser({
        ...userData,
        id: userData.id || userData._id,
      });
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("❌ Failed to fetch user details:", error);
      Swal.fire("Error", "Failed to load user details", "error");
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUserModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleCreateUser = async (formData) => {
  //   try {
  //     const response = await axiosInstance.post("/user/create", formData);

  //     const newUser = response?.data?.data?.user;

  //     console.log("User created:", newUser);

  //     setUserList((prev) => [newUser, ...prev]);
  //   } catch (error) {
  //     console.error("Create user failed:", error);
  //   }
  // };

  const handleCreateUser = async (formData) => {
  try {
    const payload = {
      ...formData,
      role: "user",
    };

    console.log("Sending payload:", payload);

    const response = await axiosInstance.post("/user/create", payload);

    console.log("Response:", response.data);

    const newUser = response?.data?.data?.user;

    setUserList((prev) => [newUser, ...prev]);
  } catch (error) {
    console.error("Create user failed:", error);
    console.log("Backend error:", error?.response?.data); // 👈 IMPORTANT
  }
};

 
  const handleEdit = (row) => {
    setSelectedUser({
      ...row,
      id: row.id || row._id, // handle Mongo _id
    });
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };
 //edit user info
  const handleUpdateUser = async (formData) => {
    try {
      const userId = selectedUser?.id;

      const response = await axiosInstance.patch(
        `/user/update/${userId}`,
        formData,
      );

      const updatedUser = response?.data?.data?.user;

      // ✅ update UI instantly
      setUserList((prev) =>
        prev.map((user) =>
          (user.id || user._id) === userId ? { ...user, ...updatedUser } : user,
        ),
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  //Delete user
  const handleDelete = async (row) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await axiosInstance.delete(`/user/delete/${row.id}`);

      // ✅ Update UI without reload
      setUserList((prev) => prev.filter((u) => u.id !== row.id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUserList(response?.data?.data);
        console.log("Fetched users:", response?.data?.data);
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
        handleAddUserModal={handleAddUserModal}
      />
      <CreateUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
      />
      <UpdateUser
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateUser}
        userData={selectedUser}
      />
      <ViewUser
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        userData={selectedUser}
      />
    </>
  );
};

export default AdminUsersContainer;
