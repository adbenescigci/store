import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import RecordsAboutTransaction from "./RecordsAboutTransaction";
import { items } from "../../const/itemsList.js";
import { useSelectedList } from "../../../../hooks/useSelectedList";

const style = () => ({
  box: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      m: 1,
    },
  },
});

const AddContent = ({ type, register, errors, values, resetField }) => {
  const [navType, setType] = useState("Ziynet");
  const { list, setList } = useSelectedList();
  const transactionType = type ? "Aliş" : "Satiş";

  const handleSubTransactions = (id) => () => {
    if (!list?.find((el) => el.id === id)) {
      const item = { ...items[id], transactionType };
      setList([...list, item]);
    }
  };

  return (
    <Box sx={style().box}>
      <Grid container spacing={2} alignItems="center">
        <AddTransactionNav setType={setType} />
        <ItemList
          handleSubTransactions={handleSubTransactions}
          type={navType}
          list={list}
        />
        <SelectedList />
        {list.length > 0 && (
          <RecordsAboutTransaction
            register={register}
            errors={errors}
            resetField={resetField}
            values={values}
          />
        )}
      </Grid>
    </Box>
  );
};

export default AddContent;
