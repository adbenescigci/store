import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./providers/Redux/store";
import TransactionsProvider from "./providers/TransactionsProvider";
import App from "./App";
import { mainNavbarItems } from "./components/Navbar/consts/navbarItems";
import { theme } from "./theme";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
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
  </Provider>
);
