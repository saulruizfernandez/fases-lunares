import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";

import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={dashboardTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
