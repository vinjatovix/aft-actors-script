import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { refreshAuthToken } from "./redux/thunks/authThunks";
import { AppRouter } from "./router/AppRouter";
import { getEnv } from "./helpers/getEnv";

export const ActorsScriptApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshAuthToken());
  }, [dispatch]);

  const { ENVIRONMENT } = getEnv()
  const isDev = ENVIRONMENT !== "production";

  return (
    <>
      <AppRouter />
      {isDev && (
        <div className="dev-stripe">
          <span>ENVIRONMENT: {ENVIRONMENT.toUpperCase()}</span>
        </div>
      )}
    </>
  );
};
