import React, { createContext, useReducer, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated:
    localStorage.getItem("token") !== null &&
    localStorage.getItem("user") !== null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [state.token]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const login = async (email, password) => {
    try {
      dispatch({ type: "LOGIN_START" });

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { data } = response.data;
      const { user, authToken: token, refreshToken } = data;

      // Store refreshToken in sessionStorage for future use
      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
      }

      // Add role to user object (default to 'user' if not specified)
      const userWithRole = {
        ...user,
        role: user.role || "user",
      };

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: userWithRole, token },
      });

      return { success: true, user, token, data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      dispatch({ type: "REGISTER_START" });

      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        phone,
      });

      const { data } = response.data;
      const { user, authToken: token, refreshToken } = data;

      // Store refreshToken in sessionStorage for future use
      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
      }

      // Add role to user object (default to 'user' if not specified)
      const userWithRole = {
        ...user,
        role: user.role || "user",
      };

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user: userWithRole, token },
      });

      return { success: true, user: userWithRole, token, data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      dispatch({
        type: "REGISTER_FAILURE",
        payload: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("refreshToken");
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Helper function to check if user is admin
  const isAdmin = () => {
    return state.user?.role === "admin";
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
