import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./utils/AuthContext";
import { DarkModeProvider } from "./utils/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </AuthProvider>
);
