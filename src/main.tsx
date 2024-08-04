import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Tu código personalizado de JavaScript

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
