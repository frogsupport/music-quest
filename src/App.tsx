import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <StrictMode>
      <div>hahahahahaha</div>
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
