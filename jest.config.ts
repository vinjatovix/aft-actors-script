import { Config } from "@jest/types";
import * as path from "path";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: path.resolve(__dirname, "tsconfig.app.json"),
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};

export default config;
