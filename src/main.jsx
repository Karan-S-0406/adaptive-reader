import React from "react";
import ReactDOM from "react-dom/client";
import RouterConfig from "./route/RouterConfig";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import AuthGuard from "../auth-gaurd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthGuard>
          <div className="App" style={{ height: "100%", width: "100%" }}>
            <RouterConfig />
          </div>
        </AuthGuard>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
