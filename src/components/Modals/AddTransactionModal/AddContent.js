import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import { items } from "../const/itemsList.js";

const AddContent = () => {
  const [list, setList] = useState([]);
  const [navType, setType] = useState("Ziynet");

  const handleSubTransactions = (id) => () => {
    if (!list.find((el) => el.id === id)) {
      setList([...list, items[id]]);
    }
  };

  const handleDelete = (id) => {
    const newList = list.filter((el) => el.id !== id);
    setList(newList);
  };

  const handleChange = (type, index) => (event) => {
    const { value } = event.target;

    let newList = [...list];
    newList[index][type] = Number(value);
    setList(newList);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > *": {
          m: 1,
        },
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <AddTransactionNav setType={setType} />
        <ItemList
          handleSubTransactions={handleSubTransactions}
          type={navType}
          list={list}
        />
        <SelectedList
          list={list}
          handleDelete={handleDelete}
          handleChange={handleChange}
        />
      </Grid>
    </Box>
  );
};

export default AddContent;
