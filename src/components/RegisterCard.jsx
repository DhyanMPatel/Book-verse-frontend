import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { Loader2, User, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputField from "./InputField";
import { useAuth } from "../hooks/useAuth";
import RouteConstants from "../utils/routeConstants";

const RegisterCard = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await register(
      values.name,
      values.email,
      values.password,
      values.phone,
    );
    setSubmitting(false);

    if (result.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-blue-600/20 rounded-2xl blur-xl" />

        <motion.div
          variants={itemVariants}
          className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Join Book Verse
            </h1>
            <p className="text-gray-300 text-sm">
              Create your account to access the digital library
            </p>
          </motion.div>

          <Formik
            enableReinitialize={true}
            initialValues={signUpInitialValues}
            validationSchema={signUpValidation}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <motion.div variants={itemVariants}>
                  <InputField
                    label="Full Name"
                    name="name"
                    type="name"
                    placeholder="Enter your full name"
                    disabled={loading || isSubmitting}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled={loading || isSubmitting}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    disabled={loading || isSubmitting}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading || isSubmitting}
                  />
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="space-y-4">
                  <motion.button
                    type="submit"
                    disabled={loading || isSubmitting}
                    variants={buttonVariants}
                    whileHover={!loading && !isSubmitting ? "hover" : ""}
                    whileTap={!loading && !isSubmitting ? "tap" : ""}
                    className="w-full py-3 px-4 bg-linear-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading || isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </motion.button>

                  <div className="flex items-center justify-between text-sm">
                    <motion.a
                      href={RouteConstants.login}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Already have an account?
                    </motion.a>

                    <motion.a
                      href="#"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      Forgot Password?
                    </motion.a>
                  </div>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterCard;
