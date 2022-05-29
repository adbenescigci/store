import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";

import { mainNavbarItems } from "./consts/navbarItems";
import { useNavigate } from "react-router-dom";

const NavbarMobile = () => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: { md: "none", sm: "none" },
      }}
    >
      <BottomNavigation
        sx={{
          backgroundColor: "primary.main",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {mainNavbarItems.map((item) => (
          <BottomNavigationAction
            sx={{
              color: "#c6d8e7",
              "&.Mui-selected": {
                color: "white",
              },
            }}
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
