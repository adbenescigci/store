import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";
import { mainNavbarItems } from "./consts/navbarItems";

const style = {
  box: {
    width: "100%",
    display: { md: "none", sm: "none" },
    position: "sticky",
    top: "6.5%",
    zIndex: "1",
  },
  bottomNavigation: {
    backgroundColor: "black",
    opacity: "0.78",
  },
  bottomNavigationAction: {
    color: "#c6d8e7",
    "&.Mui-selected": {
      color: "#b28900",
    },
  },
};

const NavbarMobile = ({ path }) => {
  let navigate = useNavigate();
  const [value, setValue] = useState();
  // const params = useLocation();

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (path) {
      case "/islemler":
        setValue(0);
        break;
      case "/kasa":
        setValue(1);
        break;
      case "/urunler":
        setValue(2);
        break;
      case "/ozet":
        setValue(3);
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={style.box}>
      <BottomNavigation
        sx={style.bottomNavigation}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {mainNavbarItems.map((item) => (
          <BottomNavigationAction
            sx={style.bottomNavigationAction}
            key={item.id}
            label={item.label}
            icon={item.icon}
            onClick={() => navigate(item.route)}
          />
        ))}
      </BottomNavigation>
      <Divider />
    </Box>
  );
};

export default NavbarMobile;
