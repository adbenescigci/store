import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

const SearchBar = ({ placeholder, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "66%", md: "100%" },
      }}
    >
      <SearchIcon sx={{ marginRight: { xs: "5px", md: "10px" } }} />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: ["0.9rem", "1.1rem"],
          width: ["100%"],
        }}
        disableUnderline
      />
    </Box>
  );
};

export default SearchBar;
