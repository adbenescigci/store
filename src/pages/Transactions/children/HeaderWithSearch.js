import React, { memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import CommonButton from "../../../components/common/CommonButton/CommonButton";
import { cardHeaderStyles } from "../styles";

const HeaderWithSearch = ({ setOpen, handleRefresh, setKeyword }) => {
  const handleChange = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    setKeyword(lowercasedValue);
  };

  const openTransactionModal = () => {
    setOpen(true);
  };

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Ayar, urun cesidi, satici,..."
        onChange={(event) => handleChange(event.target.value)}
      />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CommonButton
          variant="contained"
          onClick={openTransactionModal}
          size="medium"
          sx={cardHeaderStyles.newTransactionButton}
        >
          Yeni
        </CommonButton>
        <IconButton
          onClick={() =>
            handleRefresh({
              severity: "success",
              message: "Basariyla Guncellendi",
            })
          }
        >
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(HeaderWithSearch);
