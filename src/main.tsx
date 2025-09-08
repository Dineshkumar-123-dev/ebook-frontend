import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BooksProvider } from "../src/context/BooksContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>
);
