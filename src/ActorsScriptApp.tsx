import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { Typography } from "@mui/material";
import { refreshAuthToken } from "./redux/thunks/authThunks";
import { AppRouter } from "./router/AppRouter";
import { getEnv } from "./helpers/getEnv";
import { AppTheme } from "./theme";

export const ActorsScriptApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshAuthToken());
  }, [dispatch]);

  const { ENVIRONMENT } = getEnv()
  const isDev = ENVIRONMENT !== "production";

  return (
    <AppTheme>

      <AppRouter />
      {isDev && (
        <div className="dev-stripe">
          <Typography variant="h6">ENVIRONMENT: {ENVIRONMENT.toUpperCase()}</Typography>
        </div>
      )}
    </AppTheme>
  );
};
