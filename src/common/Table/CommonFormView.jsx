import React from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { Loader2 } from "lucide-react";
import InputField from "../../components/InputField";
import RouteConstants from "../../utils/routeConstants";
import {
  cardVariants,
  itemVariants,
  buttonVariants,
  formThemes,
} from "./formVariants";

// const {Div, Button, A} = motion;
const Div = motion.div;
const Button = motion.button;
const A = motion.a;

const CommonFormView = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  theme = "login",
  loading,
  error,
  showForgotPassword = true,
  showSignUpLink = true,
  showSignInLink = false,
  additionalLinks = [],
  onLinkClick,
}) => {
  const currentTheme = formThemes[theme] || formThemes.login;

  return (
    <Div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        <div
          className={`absolute inset-0 bg-linear-to-r ${currentTheme.gradient} rounded-2xl blur-xl`}
        />

        <Div
          variants={itemVariants}
          className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          }}
        >
          <Div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentTheme.title}
            </h1>
            <p className="text-gray-300 text-sm">{currentTheme.subtitle}</p>
          </Div>

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {fields.map((field) => (
                  <Div key={field.name} variants={itemVariants}>
                    <InputField
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={loading || isSubmitting}
                      {...field.props}
                    />
                  </Div>
                ))}

                {error && (
                  <Div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </Div>
                )}

                <Div variants={itemVariants} className="space-y-4">
                  <Button
                    type="submit"
                    disabled={loading || isSubmitting}
                    variants={buttonVariants}
                    whileHover={!loading && !isSubmitting ? "hover" : ""}
                    whileTap={!loading && !isSubmitting ? "tap" : ""}
                    className={`w-full py-3 px-4 bg-linear-to-r ${currentTheme.buttonGradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2`}
                  >
                    {loading || isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {currentTheme.loadingText}
                      </>
                    ) : (
                      currentTheme.submitText
                    )}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
            
                    {showForgotPassword && (
                      <A
                        href="#"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          onLinkClick?.("/forgot-password");
                        }}
                      >
                        Forgot Password?
                      </A>
                    )}

                    {/* <A
                      href="#"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        onLinkClick?.("/reset-password");
                      }}
                    >
                      Reset Password
                    </A> */}

                    <div className="flex gap-4">
                      {showSignUpLink && (
                        <A
                          href={RouteConstants.register}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            onLinkClick?.(RouteConstants.register);
                          }}
                        >
                          Sign Up
                        </A>
                      )}

                      {showSignInLink && (
                        <A
                          href={RouteConstants.login}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            onLinkClick?.(RouteConstants.home);
                          }}
                        >
                          Sign In
                        </A>
                      )}
                    </div>
                  </div>

                  {additionalLinks.map((link, index) => (
                    <Div
                      key={index}
                      variants={itemVariants}
                      className="text-center"
                    >
                      <A
                        href={link.path}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${link.color || "text-gray-400"} hover:${link.hoverColor || "text-gray-300"} transition-colors duration-200 text-sm`}
                        onClick={(e) => {
                          e.preventDefault();
                          onLinkClick?.(link.path);
                        }}
                      >
                        {link.text}
                      </A>
                    </Div>
                  ))}
                </Div>
              </Form>
            )}
          </Formik>
        </Div>
      </div>
    </Div>
  );
};

export default CommonFormView;
