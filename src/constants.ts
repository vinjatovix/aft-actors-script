import { getEnv } from "./helpers/getEnv";

const { API_URL, ENVIRONMENT, APP_VERSION } = getEnv();

export { ENVIRONMENT, API_URL, APP_VERSION };
