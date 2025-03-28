import { Routes, Route } from "react-router-dom";
import Login from "../auth/pages/Login";
import { NavBar } from "../ui/NavBar";
import { ActorsScriptRoutes } from "../actorsScript/routes/ActorsScriptRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../actorsScript/pages/Home";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <NavBar />
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
