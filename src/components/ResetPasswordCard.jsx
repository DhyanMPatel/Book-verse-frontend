import React, { useState } from "react";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import CommonFormController from "../common/Table/CommonFormController";
import axiosinstance from "../services/axiosInstance";
import Swal from "sweetalert2";

const ResetPasswordCard = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

const handleSubmit = async (values) => {
  try {
    const response = await axiosinstance.post(
      `/auth/reset-password/${token}`,
      {
        newPassword: values.password,
      }
    );

    console.log("SUCCESS:", response.data);

    // ✅ Success Alert
    Swal.fire({
      icon: "success",
      title: "Password Reset Successful",
      text: response?.data?.message || "You can now login",
      confirmButtonColor: "#3085d6",
    });

    return {
      success: true,
      redirect: "/login",
    };

  } catch (error) {
    console.log("ERROR:", error?.response?.data);

    // ❌ Error Alert
    Swal.fire({
      icon: "error",
      title: "Reset Failed",
      text:
        error?.response?.data?.message ||
        "Invalid or expired token. Please try again.",
      confirmButtonColor: "#d33",
    });

    return { success: false };
  }
};
    console.log("TOKEN:", token);


  const fields = [
    {
      name: "password",
      label: "Create New Password",
      type: "password", // ✅ always password
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password", // ✅ always password
      placeholder: "Confirm new password",
    },
  ];

  return (
    <CommonFormController
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      theme="resetPassword"
      showForgotPassword={false}
      showSignUpLink={false}
      showSignInLink={true}
      loading={loading}
    />
  );
};

export default ResetPasswordCard;