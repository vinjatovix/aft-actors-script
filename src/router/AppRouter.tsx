import { Routes, Route } from "react-router-dom";
import Login from "../auth/pages/Login";
import { ActorsScriptRoutes } from "../actorsScript/routes/ActorsScriptRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../actorsScript/pages/Home";
import { PublicRoute } from "./PublicRoute";
import { Register } from "../auth/pages/Register";
import ResponsiveAppBar from "../ui/ResponsiveAppBar";

export const AppRouter = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="home" element={<Home />} />

        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <ActorsScriptRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
