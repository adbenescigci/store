import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import { cardHeaderStyles } from "./styles";
import AddTransactionModal from "../../components/Modals/AddTransactionModal/AddTransactionModal.js";

import { ShopContext } from "../../contextProvider/ContextProvider";
import {
  doTransaction,
  updateTransaction,
  refreshTransactions,
} from "../../api/index";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(ShopContext);

  //Functions
  const onCloseModal = () => {
    setOpen(false);
  };

  const addNewTransaction = async (newTransaction) => {
    try {
      await doTransaction(newTransaction);
    } catch (error) {
      console.log(error.message);
    }
    setOpen(false);
    refresh();
  };

  const removeTransaction = async (index) => {
    const id = state.transactions[index]._id;
    await updateTransaction(id, { isDeleted: true });
    dispatch({ type: "REMOVE_TRANSACTION", id });
    refresh();
  };

  const refresh = async () => {
    console.log(state);
    const { data } = await refreshTransactions(state.lastUpdated);
    dispatch({ type: "REFRESH", data });
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
    <Box>
      <List dense={true}>
        {state.transactions?.map((el, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                onClick={() => removeTransaction(index)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={el.title}
              secondary={true ? el.description : null}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  //Render
  return (
    <BoxWrapper>
      <BasicCard header={getHeader()} content={getContent()} />
      <AddTransactionModal
        open={open}
        onClose={onCloseModal}
        addNewTransaction={addNewTransaction}
      />
    </BoxWrapper>
  );
};

export default Transactions;
