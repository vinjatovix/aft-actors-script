import { version } from "../../package.json";

export const getEnv = (): Record<string, string> => {
  const env = import.meta.env;

  return {
    API_URL: env.VITE_API_URL,
    ENVIRONMENT: env.VITE_MODE,
    APP_VERSION: version,
  };
};
