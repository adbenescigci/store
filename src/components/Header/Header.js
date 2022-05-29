import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const Header = ({ title }) => {
  const headerStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#009be5",
    justifyContent: "end",
    alignItems: "center",
    padding: "0",
    height: ["50px", "65px"],
    margin: "0",
    "*": {
      padding: ["1px", "5px"],
      "&:hover": {
        color: "#fff",
        cursor: "pointer",
      },
    },
  };

  return (
    <Box sx={headerStyles}>
      <Avatar>RC</Avatar>
      <ExitToAppRoundedIcon sx={{ color: "white" }} />
    </Box>
  );
};

export default Header;
