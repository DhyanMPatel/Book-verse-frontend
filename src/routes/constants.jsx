import { Suspense } from "react";
import { MainLayoutContainer } from "../layout/layoutIndex";
import {
  CartContainer,
  ErrorContainer,
  HomeContainer,
  LibraryContainer,
  LoginContainer,
  ProfileContainer,
  RegisterContainer,
  SearchContainer,
  WishlistContainer,
  BooksDetailContainer,
} from "../pages/pageIndex";
import RouteConstants from "../utils/routeConstants";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

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
          // <PublicRoute>
            <Suspense fallback="loading">
              <div className="pt-[64px]">
                <HomeContainer />
              </div>
            </Suspense>
          // </PublicRoute>
        ),
      },
      // Search route
      {
        path: RouteConstants.search,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <div className="pt-[64px]">
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
              <div className="pt-[64px]">
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
              <div className="pt-[64px]">
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
              <div className="pt-[64px]">
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
              <div className="pt-[64px]">
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
