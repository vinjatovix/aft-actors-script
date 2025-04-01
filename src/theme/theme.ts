import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleThemeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

export const purpleThemeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#262254",
    },
    secondary: {
      main: "#543884",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export const blackThemeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0a0a0a",
    },
    secondary: {
      main: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});
