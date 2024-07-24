import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { initMocks } from "./mock/index.ts";

initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
