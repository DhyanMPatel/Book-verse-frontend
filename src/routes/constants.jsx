import { Suspense } from "react";
import { MainLayoutContainer } from "../layout/layoutIndex";
import {
  CartContainer,
  ErrorContainer,
  HomeContainer,
  LibraryContainer,
  LoginContainer,
  ForgotpasswordContainer,
  ResetPasswordContainer,
  ProfileContainer,
  RegisterContainer,
  SearchContainer,
  WishlistContainer,
  BooksDetailContainer,
} from "../pages/pageIndex";
import {
  AdminDashboardContainer,
  AdminUsersContainer,
  AdminBooksContainer,
  AdminOrdersContainer,
} from "../pages/admin/pageIndex";
import RouteConstants from "../utils/routeConstants";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";
import AdminRoute from "./adminRoutes";

export const AppRoutes = [
  {
    path: RouteConstants.home,
    element: <MainLayoutContainer />, // layout wraps authenticated pages only
    children: [
      {
        path: RouteConstants.login,
        element: (
          <PublicRoute>
            <Suspense fallback="loading">
              <LoginContainer />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: RouteConstants.forgotPassword,
        element: (
          <PublicRoute>
            <Suspense fallback="loading">
              <ForgotpasswordContainer />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: RouteConstants.resetPassword,
        element: (
          <PublicRoute>
            <Suspense fallback="loading">
              <ResetPasswordContainer />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: RouteConstants.register,
        element: (
          <PublicRoute>
            <Suspense fallback="loading">
              <RegisterContainer />
            </Suspense>
          </PublicRoute>
        ),
      },
      {
        path: RouteConstants.home,
        element: (
          <Suspense fallback="loading">
            <div className="page-content">
              <HomeContainer />
            </div>
          </Suspense>
        ),
      },
      // Search route
      {
        path: RouteConstants.search,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <SearchContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      },
      // Library route
      {
        path: RouteConstants.library,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <LibraryContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      },
      // Cart route
      {
        path: RouteConstants.cart,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <CartContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      },
      // Profile route
      {
        path: RouteConstants.profile,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <ProfileContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      },
      // Wishlist route
      {
        path: RouteConstants.wishlist,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <WishlistContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      },
        {
        path: RouteConstants.booksdetails,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="pt-[64px]">
                <BooksDetailContainer />
              </div>
            </Suspense>
          </PrivateRoute>
        ),
      }, 
      
      // Admin routes
      {
        path: RouteConstants.adminDashboard,
        element: (
          <AdminRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <AdminDashboardContainer />
              </div>
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: RouteConstants.adminUsers,
        element: (
          <AdminRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <AdminUsersContainer />
              </div>
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: RouteConstants.adminBooks,
        element: (
          <AdminRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <AdminBooksContainer />
              </div>
            </Suspense>
          </AdminRoute>
        ),
      },
      {
        path: RouteConstants.adminOrders,
        element: (
          <AdminRoute>
            <Suspense fallback="loading">
              <div className="page-content">
                <AdminOrdersContainer />
              </div>
            </Suspense>
          </AdminRoute>
        ),
      },
    ],
  },
];

export const ErrorRoutes = {
  path: "*",
  element: (
    <Suspense fallback="loading">
      <ErrorContainer />
    </Suspense>
  ),
};
