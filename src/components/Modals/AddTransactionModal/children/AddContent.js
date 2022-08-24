import React, { useState, memo, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import RecordsAboutTransaction from "./RecordsAboutTransaction";
import { items } from "../../const/itemsList.js";

const style = () => ({
  box: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      m: 1,
    },
  },
});

const AddContent = ({ list, setList, type, formData }) => {
  const [navType, setType] = useState("Ziynet");
  const transactionType = type ? "Alis" : "Satis";

  const handleSubTransactions = (id) => () => {
    if (!list?.find((el) => el.id === id)) {
      const item = { ...items[id], transactionType };
      setList([...list, item]);
    }
  };

  const handleDelete = useCallback(
    (id) => {
      const newList = list?.filter((el) => el.id !== id);
      setList(newList);
    },
    [list, setList]
  );

  return (
    <Box sx={style().box}>
      <Grid container spacing={2} alignItems="center">
        <AddTransactionNav setType={setType} />
        <ItemList
          handleSubTransactions={handleSubTransactions}
          type={navType}
          list={list}
        />
        <SelectedList
          list={list}
          formData={formData}
          handleDelete={handleDelete}
        />
        {list.length > 0 && (
          <RecordsAboutTransaction list={list} formData={formData} />
        )}
      </Grid>
    </Box>
  );
};

export default memo(AddContent);
