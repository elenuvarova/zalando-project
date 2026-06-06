import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted editorial type — Fraunces (variable serif) for display, Inter (variable) for body.
// Self-hosting keeps the CSP tight ('self') and avoids a render-blocking third-party request.
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
