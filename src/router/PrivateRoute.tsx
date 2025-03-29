import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { pathname, search } = useLocation();

  localStorage.setItem("lastPath", pathname + search);

  return token ? children : <Navigate to="/login" />;
};
