import React, { useState, useContext, useMemo } from "react";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import AddTransactionModal from "../../components/Modals/AddTransactionModal/AddTransactionModal.js";
import { ShopContext } from "../../providers/TransactionsProvider";
import SelectedItemsProvider from "../../providers/SelectedItemsProvider";
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import HeaderWithSearch from "./children/HeaderWithSearch";
import Content from "./children/Content";
import { getFilter } from "../../utils/handyFunctions";
import {
  doTransaction,
  updateTransaction,
  refreshTransactions,
} from "../../api/index";

const Transactions = () => {
  const { state, dispatch } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [alert, setAlert] = useState();
  const [keyword, setKeyword] = useState("");

  const filteredTransactions = useMemo(
    () => getFilter(state?.transactions, keyword),
    [keyword, state?.transactions]
  );

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
    refresh(result);
  };

  const removeTransaction = async (index) => {
    const id = state.transactions[index]._id;
    const result = await updateTransaction(id, { isDeleted: true });
    refresh(result);
  };

  const refresh = async (result) => {
    const { data } = await refreshTransactions(state?.lastUpdated);
    dispatch({ type: "REFRESH", data });
    setAlert(result);
    setOpen(false);
    setOpenSnackBar(true);
  };

  //Render
  return (
    <BoxWrapper>
      <BasicCard
        header={
          <HeaderWithSearch
            setOpen={setOpen}
            handleRefresh={refresh}
            setKeyword={setKeyword}
          />
        }
        content={
          <Content
            transactions={filteredTransactions}
            removeTransaction={removeTransaction}
          />
        }
      />
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
        severity={alert?.severity}
        message={alert?.message}
      />
    </BoxWrapper>
  );
};

export default Transactions;
