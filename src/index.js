import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import "./index.css";
import App from "./App";
import { mainNavbarItems } from "./components/Navbar/consts/navbarItems";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={dashboardTheme}>
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
);
