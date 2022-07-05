import React, { useState, useContext } from "react";
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
import { ShopContext } from "../../providers/TransactionsProvider";
import SelectedItemsProvider from "../../providers/SelectedItemsProvider";
import {
  doTransaction,
  updateTransaction,
  refreshTransactions,
} from "../../api/index";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(ShopContext);

  //Functions
  const onCloseModal = (e, reason) => {
    if (reason !== "backdropClick") setOpen(false);
  };

  const addNewTransaction = async (newTransaction) => {
    await doTransaction(newTransaction);
    refresh();
  };

  const removeTransaction = async (index) => {
    const id = state.transactions[index]._id;
    await updateTransaction(id, { isDeleted: true });
    refresh();
  };

  const refresh = async () => {
    const { data } = await refreshTransactions(state?.lastUpdated);
    dispatch({ type: "REFRESH", data });
    setOpen(false);
  };

  //Header
  const getHeader = () => {
    const handleChange = (value) => {
      console.log(value);
    };

    const openTransactionModal = () => {
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
            onClick={openTransactionModal}
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
      <SelectedItemsProvider>
        <AddTransactionModal
          open={open}
          onClose={onCloseModal}
          addNewTransaction={addNewTransaction}
        />
      </SelectedItemsProvider>
    </BoxWrapper>
  );
};

export default Transactions;
