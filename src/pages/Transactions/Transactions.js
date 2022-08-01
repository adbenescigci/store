import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(state?.transactions);
  }, [state]);

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
      filterData(value);
    };

    const filterData = (value) => {
      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") setSearchResults(state?.transactions);
      else {
        const filteredData = searchResults.filter((item) => {
          return Object.keys(item).some((key) => {
            let flag1, flag2;
            if (key !== "subTransactions") {
              flag1 = item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue);
            }

            if (key === "subTransactions") {
              item[key].every((el) => {
                flag2 = Object.keys(el).some((key) =>
                  el[key].toString().toLowerCase().includes(lowercasedValue)
                );
                if (flag2) {
                  return false;
                }
                return true;
              });
            }

            return flag1 || flag2;
          });
        });

        setSearchResults(filteredData);
      }
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
          ` ${item.amount} ${item.unit} ${item.history?.charAt(0) ?? ""} ${
            item.label
          } ${item.type} ${item.transactionType === "Aliş" ? "Aliş" : ""}`
      )
      .join("\r\n");
  };

  const getContent = () => (
    <Box>
      <List dense={true}>
        {searchResults?.map((el, index) => (
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
              <Avatar>{el.user.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemAvatar sx={{ display: "flex", flexDirection: "column" }}>
              {getIcons(el).map((el, index) =>
                el === "Satiş" ? (
                  <ChevronLeftIcon key={index} sx={{ color: "green" }} />
                ) : (
                  <ChevronRightIcon key={index} sx={{ color: "red" }} />
                )
              )}
            </ListItemAvatar>
            <ListItemText
              sx={{
                whiteSpace: "pre-line",
              }}
              primary={el.title}
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
