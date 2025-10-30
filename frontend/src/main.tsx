import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // loads tailwindcss globally
import AppRouter from "./routes/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
