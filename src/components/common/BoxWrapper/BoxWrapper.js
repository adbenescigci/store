import React from "react";
import Box from "@mui/material/Box";
import { boxWrapperStyles } from "./styles";

const BoxWrapper = ({ children }) => {
  return <Box sx={boxWrapperStyles}>{children}</Box>;
};

export default BoxWrapper;
