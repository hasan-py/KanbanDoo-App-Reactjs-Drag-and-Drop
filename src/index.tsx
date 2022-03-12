import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./screens/home";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
