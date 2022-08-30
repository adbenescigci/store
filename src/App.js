import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import NavbarMobile from "./components/Navbar/NavbarMobile.js";
import NavbarDesktop from "./components/Navbar/NavbarDesktop.js";
import Header from "./components/Header/Header";
import { getDailyTransactions } from "./api/index";
import { ShopContext } from "./providers/TransactionsProvider";

const App = () => {
  const { dispatch } = useContext(ShopContext);

  let navigate = useNavigate();
  let location = useLocation();

  //try catch wtih error

  const fetchTransactions = async () => {
    const { data } = await getDailyTransactions();
    console.log(data);
    dispatch({
      type: "FETCH_TRANSACTIONS",
      data,
    });
  };

  //REDIRECT
  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("islemler");
    }
  }, [location?.pathname, navigate]);

  //FETCH DATA
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appStyles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: { xs: "column", sm: "row", ms: "row" },
    },
    row: {
      width: "100%",
      height: "100%",
      backgroundColor: "#f5f5f5",
    },
  };

  return (
    <Box sx={appStyles.wrapper}>
      <NavbarDesktop />
      <Box sx={appStyles.row}>
        <Header title={location.pathname} />
        <NavbarMobile path={location?.pathname} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
