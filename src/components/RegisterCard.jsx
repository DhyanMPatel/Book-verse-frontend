import React from "react";
import * as yup from "yup";
import CommonFormController from "../common/Table/CommonFormController";
import { useAuth } from "../hooks/useAuth";
import RouteConstants from "../utils/routeConstants";

const RegisterCard = () => {
  const { register } = useAuth();

  const signUpInitialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const signUpValidation = yup.object({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values) => {
    const result = await register(
      values.name,
      values.email,
      values.password,
      values.phone,
    );
    if (result.success) {
      return { success: true, redirect: RouteConstants.login };
    }
    return { success: false };
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your 10-digit phone number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const additionalLinks = [
    {
      text: "Already have an account?",
      path: RouteConstants.login,
      color: "text-blue-400",
      hoverColor: "text-blue-300",
    },
  ];

  return (
    <CommonFormController
      initialValues={signUpInitialValues}
      validationSchema={signUpValidation}
      onSubmit={handleSubmit}
      fields={fields}
      theme="register"
      showForgotPassword={true}
      showSignUpLink={false}
      showSignInLink={false}
      additionalLinks={additionalLinks}
    />
  );
};

export default RegisterCard;
