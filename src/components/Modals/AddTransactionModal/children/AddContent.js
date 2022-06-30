import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import { items } from "../../const/itemsList.js";

const style = {
  box: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      m: 1,
    },
  },
};

const AddContent = ({ type }) => {
  const [navType, setType] = useState("Ziynet");
  const [list, setList] = useState([]);
  const transactionType = type ? "Aliş" : "Satiş";

  const handleSubTransactions = (id) => () => {
    if (!list.find((el) => el.id === id)) {
      const item = { ...items[id], transactionType };
      setList([...list, item]);
    }
  };

  return (
    <Box sx={style.box}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <AddTransactionNav setType={setType} />
        <ItemList
          handleSubTransactions={handleSubTransactions}
          type={navType}
          list={list}
        />
        <SelectedList list={list} setList={setList} />
      </Grid>
    </Box>
  );
};

export default AddContent;
