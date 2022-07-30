import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";

import { mainNavbarItems } from "./consts/navbarItems";
import { useNavigate } from "react-router-dom";

const style = {
  box: {
    width: "100%",
    display: { md: "none", sm: "none" },
    position: "sticky",
    top: "6%",
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

const NavbarMobile = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState(0);

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
