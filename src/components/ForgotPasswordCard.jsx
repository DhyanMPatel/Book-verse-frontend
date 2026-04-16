import React from "react";
import * as yup from "yup";
import { useState } from "react";
import CommonFormController from "../common/Table/CommonFormController";
import axiosinstance from  "../services/axiosInstance";
import Swal from "sweetalert2"; // ✅ import this

const ForgotPasswordCard = () => {
const [loading, setLoading] = useState(false);
// const []

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

 const handleSubmit = async (values) => {
  try {
    setLoading(true);

    const response = await axiosinstance.post(
  "/auth/forgot-password", // ✅ FIXED
  { email: values.email }
);

    // ✅ SUCCESS POPUP
    Swal.fire({
      icon: "success",
      title: "Email Sent!",
      text: response?.data?.message || "Check your inbox",
    });

  } catch (error) {
    console.log("Error:", error);

    // ❌ ERROR POPUP
    Swal.fire({
      icon: "error",
      title: "Invalid User",
      text:
        error?.response?.data?.message ||
        "User with this email does not exist",
    });

  } finally {
    setLoading(false);
  }
};

  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
    },
  ];

  return (
    <CommonFormController
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      theme="forgotPassword"
      showForgotPassword={false}
      showSignUpLink={false}
      showSignInLink={false}
    />
  );
};

export default ForgotPasswordCard;