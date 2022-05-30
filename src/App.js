import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import NavbarDesktop from "./components/Navbar/NavbarDesktop.js";
import NavbarMobile from "./components/Navbar/NavbarMobile.js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { getTransactions } from "./api/index";

import { ShopContext } from "./contextProvider/ContextProvider";

const App = () => {
  const { dispatch } = useContext(ShopContext);

  let navigate = useNavigate();
  let location = useLocation();

  const fetchTransactions = async () => {
    const { data } = await getTransactions();
    dispatch({ type: "FETCH_TRANSACTIONS", data });
  };

  //REDIRECT
  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("islemler");
    }
  }, [location?.pathname, navigate]);

  //FETCH DATA
  useEffect(() => {
    console.log("fetch");
    fetchTransactions();
  }, []);

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
