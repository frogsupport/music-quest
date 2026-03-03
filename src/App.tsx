import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./providers/AuthProvider";

let container = document.getElementById("root");

if (!container) {
  container = document.createElement("div");
  container.id = "root";
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
