import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

const App = () => {
  return (
    <StrictMode>
      <Home />
    </StrictMode>
  );
};

let container = document.getElementById("root");
if (!container) {
  container = document.createElement("div");
  container.id = "root";
}

const root = createRoot(container);
root.render(<App />);
