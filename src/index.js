import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";
import App from "./App";
import MyContextProvider from "./MyContext/MyContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContextProvider>
    <App />
  </MyContextProvider>
);
