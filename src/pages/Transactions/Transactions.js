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
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  doTransaction,
  updateTransaction,
  refreshTransactions,
} from "../../api/index";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });
  const { state, dispatch } = useContext(ShopContext);

  //Functions
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const onCloseModal = (e, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const addNewTransaction = async (newTransaction) => {
    console.log(newTransaction);
    const result = await doTransaction(newTransaction);
    setAlert(result);
    setOpenSnackBar(true);
    refresh();
  };

  const removeTransaction = async (index) => {
    const id = state.transactions[index]._id;
    const result = await updateTransaction(id, { isDeleted: true });
    setAlert(result);
    setOpenSnackBar(true);
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

  const getIcons = (el) => {
    const array = el.subTransactions.map((item) => item.transactionType);
    return [...new Set(array)];
  };

  const getSecondaryText = (el) => {
    return el.subTransactions
      .map(
        (item) =>
          `${item.transactionType.charAt(0)} ${item.amount} ${item.unit} ${
            item.label
          } ${item.type}`
      )
      .join("\r\n");
  };

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
                <DeleteIcon
                  sx={{
                    "&:hover": {
                      color: "secondary.light",
                    },
                  }}
                />
              </IconButton>
            }
          >
            <ListItemAvatar sx={{ display: "flex", flexDirection: "column" }}>
              {getIcons(el).map((el) =>
                el === "Satiş" ? <ChevronRightIcon /> : <ChevronLeftIcon />
              )}
            </ListItemAvatar>
            <ListItemText
              sx={{
                whiteSpace: "pre-line",
              }}
              primary={[el.user, el.title].join(" | ")}
              secondary={getSecondaryText(el)}
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
          setOpen={setOpen}
          onClose={onCloseModal}
          addNewTransaction={addNewTransaction}
        />
      </SelectedItemsProvider>
      <BasicSnackbar
        open={openSnackBar}
        onClose={handleCloseSnackBar}
        severity={alert.severity}
        message={alert.message}
      />
    </BoxWrapper>
  );
};

export default Transactions;
