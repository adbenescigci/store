import * as React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import NavbarDesktop from "./components/Navbar/NavbarDesktop.js";
import NavbarMobile from "./components/Navbar/NavbarMobile.js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("islemler");
    }
  }, [location?.pathname, navigate]);

  const appStyles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: { xs: "column", sm: "row", ms: "row" },
    },
    row: {
      width: "100%",
    },
  };

  return (
    <Box sx={appStyles.wrapper}>
      <NavbarDesktop />
      <Box sx={appStyles.row}>
        <Header title={location.pathname} />
        <NavbarMobile />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
