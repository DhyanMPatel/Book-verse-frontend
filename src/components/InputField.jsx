import React, { useState } from "react";
import { useField } from "formik";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";

const InputField = ({
  type = "text",
  placeholder,
  label,
  disabled = false,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [field, meta] = useField(props.name);

  const getIcon = () => {
    switch (type) {
      case "email":
        return <Mail className="w-5 h-5 text-gray-400" />;
      case "password":
        return <Lock className="w-5 h-5 text-gray-400" />;
      case "name":
        return <User className="w-5 h-5 text-gray-400" />;
      case "tel":
        return <Phone className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  const handleBlur = (e) => {
    field.onBlur(e);
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const hasError = meta.touched && Boolean(meta.error);
  const errorMessage = meta.touched && meta.error ? meta.error : "";

  return (
    <div className="w-full">
      {label && (
        <label
          className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
            hasError ? "text-red-400" : "text-gray-300"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {getIcon()}
        </div>

        <input
          {...field}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full pl-10 pr-10 py-3 
            bg-white/10 backdrop-blur-md 
            border border-white/20 
            rounded-xl 
            text-white placeholder-gray-400
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
            ${isFocused ? "bg-white/15 shadow-lg shadow-blue-500/20" : ""}
            ${hasError ? "border-red-500/50 focus:ring-red-500/50" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/12"}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-400 animate-pulse">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
