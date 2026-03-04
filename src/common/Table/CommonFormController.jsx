import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonFormView from "./CommonFormView";
import { useAuth } from "../../hooks/useAuth";

const CommonFormController = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  theme = "login",
  showForgotPassword = true,
  showSignUpLink = true,
  showSignInLink = false,
  additionalLinks = [],
}) => {
  const { loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await onSubmit(values);
      setSubmitting(false);

      if (result?.success) {
        // Navigation is handled by the specific onSubmit function
        if (result.redirect) {
          navigate(result.redirect);
        }
      }
    } catch (err) {
      setSubmitting(false);
      console.error("Form submission error:", err);
    }
  };

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  const handleLinkClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <CommonFormView
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      theme={theme}
      loading={loading}
      error={error}
      showForgotPassword={showForgotPassword}
      showSignUpLink={showSignUpLink}
      showSignInLink={showSignInLink}
      additionalLinks={additionalLinks}
      onLinkClick={handleLinkClick}
    />
  );
};

export default CommonFormController;
