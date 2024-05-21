import React from "react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      main: "#0bb6c2",
      hover: "#7abec2",
    },
    completed: {
      main: "#22c55e",
    },
    completedhover: {
      main: "#eaf8ef",
    },
    pending: {
      main: "#1ca34e",
    },
    pendinghover: {
      main: "#eaf8ef",
    },
    cardicons: {
      main: "#334155",
    },
    cardicondhover: {
      main: "#334155",
    },
  },
});

export default theme;
