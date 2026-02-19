import { Suspense } from "react";
import RouteConstants from "../utils/routeConstants";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";
import { MainLayoutContainer } from "../layout/layoutIndex";
import {
  ErrorContainer,
  HomeContainer,
  LoginContainer,
  RegisterContainer,
} from "../pages/pageIndex";

export const AppRoutes = [
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
    element: <MainLayoutContainer />, // layout wraps authenticated pages only
    children: [
      {
        path: RouteConstants.home,
        element: (
          <PrivateRoute>
            <Suspense fallback="loading">
              <HomeContainer />
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
