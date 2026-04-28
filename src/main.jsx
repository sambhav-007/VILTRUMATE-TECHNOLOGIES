import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import SmoothScroll from "./SmoothScroll";
import { PaymentPage } from "./PaymentPage";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmoothScroll>
      {path === "/payment" ? <PaymentPage /> : <App />}
    </SmoothScroll>
  </React.StrictMode>
);
