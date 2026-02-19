import { Route, Routes } from "react-router-dom";
import { AppRoutes, ErrorRoutes } from "./constants";

const renderRoutes = (routes) => {
  return routes.map((route, idx) => {
    if (route.children) {
      return (
        <Route key={idx} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={idx} path={route.path} element={route.element} />;
  });
};

const Router = () => {
  return (
    <Routes>
      {renderRoutes(AppRoutes)}
      {/* Error route as fallback */}
      <Route path={ErrorRoutes.path} element={ErrorRoutes.element} />
    </Routes>
  );
};

export default Router;
