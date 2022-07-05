import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { theme } from "./theme";
import { mainNavbarItems } from "./components/Navbar/consts/navbarItems";
import TransactionsProvider from "./providers/TransactionsProvider";

import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <TransactionsProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {mainNavbarItems.map((item, index) => (
              <Route key={item.id} path={item.route} element={item.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </TransactionsProvider>
);
