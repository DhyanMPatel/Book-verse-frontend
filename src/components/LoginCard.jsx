import React from "react";
import * as yup from "yup";
import CommonFormController from "../common/Table/CommonFormController";
import { useAuth } from "../hooks/useAuth";
import RouteConstants from "../utils/routeConstants";

const LoginCard = () => {
  const { login } = useAuth();

  const signInInitialValues = {
    email: "",
    password: "",
  };

  const signInValidation = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const result = await login(values.email, values.password);
    if (result.success) {
      return { success: true, redirect: RouteConstants.home };
    }
    return { success: false };
  };

  const fields = [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <CommonFormController
      initialValues={signInInitialValues}
      validationSchema={signInValidation}
      onSubmit={handleSubmit}
      fields={fields}
      theme="login"
      showForgotPassword={true}
      showSignUpLink={true}
      showSignInLink={false}
    />
  );
};

export default LoginCard;
