import { useState, useEffect, useContext, useMemo } from "react";
import { useSnackbar } from "notistack";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import AddTransactionModal from "../../components/Modals/AddTransactionModal/AddTransactionModal.js";
import { ShopContext } from "../../providers/TransactionsProvider";
import HeaderWithSearch from "./children/HeaderWithSearch";
import Content from "./children/Content";
import { getFilter } from "../../utils/handyFunctions";
import { getDailyTransactions } from "../../api/index";
import {
  doTransaction,
  updateTransaction,
  refreshTransactions,
} from "../../api/index";

const Transactions = () => {
  const { state, dispatch } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetchTransactions = async () => {
    const result = await getDailyTransactions();
    if (result.severity !== "error") {
      dispatch({
        type: "FETCH_TRANSACTIONS",
        data: result.data,
      });
    } else enqueueSnackbar("Veri indirilemedi", { variant: "error" });
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTransactions = useMemo(
    () => getFilter(state?.transactions, keyword),
    [keyword, state?.transactions]
  );

  const onCloseModal = (e, reason) => {
    setOpen(false);
  };

  const addNewTransaction = async (newTransaction) => {
    const data = await doTransaction(newTransaction);
    refresh(data);
  };

  const removeTransaction = async (index) => {
    const id = state.transactions[index]._id;
    const data = await updateTransaction(id, { isDeleted: true });
    refresh(data);
  };

  const refresh = async (data) => {
    const { message, severity } = data;
    const result = await refreshTransactions(state?.lastUpdated);
    setOpen(false);

    if (result.severity !== "error") {
      dispatch({
        type: "REFRESH",
        data: result.data,
      });
      enqueueSnackbar(message, { variant: severity });
    } else enqueueSnackbar(result.message, { variant: "error" });
  };

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
      <AddTransactionModal
        open={open}
        onClose={onCloseModal}
        addNewTransaction={addNewTransaction}
      />
    </BoxWrapper>
  );
};

export default Transactions;
