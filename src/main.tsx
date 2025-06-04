import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ImagesContextProvider from "./context/ImagesContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImagesContextProvider>
      <App />
    </ImagesContextProvider>
  </StrictMode>
);
