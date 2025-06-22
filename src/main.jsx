import React from "react";
import ReactDOM from "react-dom/client";
import RouterConfig from "./route/RouterConfig";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        className="App"
        style={{ height: "100%", width: "100%"}}
      >
        <RouterConfig />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
