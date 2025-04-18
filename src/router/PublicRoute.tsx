import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const lastPath = localStorage.getItem("lastPath") ?? "/";

  return token ? <Navigate to={lastPath} /> : children;
};
