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
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") !== null,
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

  const login = async (email, password) => {
    try {
      dispatch({ type: "LOGIN_START" });

      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { data } = response.data;
      const { user, authToken: token, refreshToken } = data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
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

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user, token },
      });

      return { success: true, user, token, data };
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
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
