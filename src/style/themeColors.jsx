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
    },
  },
});

export default theme;
