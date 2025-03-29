require("whatwg-fetch");
require("dotenv").config({ path: ".env.test" });

jest.mock("./src/helpers/getEnv", () => ({
  getEnv: () => ({ API_URL: process.env.VITE_API_URL, APP_VERSION: "1.0.0" }),
}));
