import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import { cardHeaderStyles } from "./styles";
import NewTransactionModal from "../../components/Modals/NewTransaction/NewTransactionModal.js";

import { createTransaction } from "../../api/index";

const Transactions = () => {
  const [open, setOpen] = useState(false);

  //Functions
  const onCloseModal = () => {
    setOpen(false);
  };

  const addNewTransaction = async (newTransaction) => {
    try {
      const { data } = await createTransaction(newTransaction);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
    setOpen(false);
  };

  //Header
  const getHeader = () => {
    const handleChange = (value) => {
      console.log(value);
    };

    const addTransaction = () => {
      setOpen(true);
    };

    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Ayar, urun cesidi, islem cinsi, satici"
          onChange={(event) => handleChange(event.target.value)}
        />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CommonButton
            variant="contained"
            onClick={addTransaction}
            size="medium"
            sx={cardHeaderStyles.newTransactionButton}
          >
            Yeni
          </CommonButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  //Content
  const getContent = () => (
    <Typography
      align="center"
      sx={{
        margin: "40px 16px",
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: "1.3rem",
      }}
    >
      No users for this project yet
    </Typography>
  );

  //Render
  return (
    <BoxWrapper>
      <BasicCard header={getHeader()} content={getContent()} />
      <NewTransactionModal
        open={open}
        onClose={onCloseModal}
        addNewTransaction={addNewTransaction}
      />
    </BoxWrapper>
  );
};

export default Transactions;
