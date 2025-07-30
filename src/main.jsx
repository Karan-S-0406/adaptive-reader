import React from "react";
import ReactDOM from "react-dom/client";
import RouterConfig from "./route/RouterConfig";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import AuthGuard from "../auth-gaurd";
import "./index.css";
import { AuthModalProvider } from "./pages/LoginModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthModalProvider>
          <AuthGuard>
            <div className="App" style={{ height: "100%", width: "100%" }}>
              <RouterConfig />
            </div>
          </AuthGuard>
        </AuthModalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
