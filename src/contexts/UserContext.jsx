
// import { createContext, useContext, useState, useEffect } from "react";
// import axiosInstance from "../services/axiosInstance";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userList, setUserList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ GET USERS
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get("/user");
//       setUserList(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       setError(err?.response?.data?.message || "Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CREATE USER
//   const createUser = async (payload) => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.post("/user/create", payload);

//       // update UI instantly
//       setUserList((prev) => [...prev, res.data.data.user]);

//       return res.data;
//     } catch (err) {
//       setError(err?.response?.data?.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ UPDATE USER
//   const updateUser = async (id, payload) => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.patch(`/user/update/${id}`, payload);

//       setUserList((prev) =>
//         prev.map((user) =>
//           user.id === id ? res.data.data.user : user
//         )
//       );

//       return res.data;
//     } catch (err) {
//       setError(err?.response?.data?.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ DELETE USER
//   const deleteUser = async (id) => {
//     try {
//       setLoading(true);
//       await axiosInstance.delete(`/user/delete/${id}`);

//       setUserList((prev) => prev.filter((u) => u.id !== id));
//     } catch (err) {
//       setError(err?.response?.data?.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // auto fetch
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         userList,
//         loading,
//         error,
//         fetchUsers,
//         createUser,
//         updateUser,
//         deleteUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // custom hook
// export const useUsers = () => useContext(UserContext);