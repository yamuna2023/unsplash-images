
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UnsplashProvider } from "./context/UnsplashContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnsplashProvider>
        <App />
      </UnsplashProvider>
    </BrowserRouter>
  </React.StrictMode>
);
