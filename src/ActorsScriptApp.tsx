import { getEnv } from "./helpers/getEnv";
import { AppRouter } from "./router/AppRouter";


export const ActorsScriptApp = () => {
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
