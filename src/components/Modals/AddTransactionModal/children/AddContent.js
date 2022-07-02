import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import { items } from "../../const/itemsList.js";

const style = (e) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      m: 1,
    },
  },

  textField: {
    textAlign: "center",
    fontSize: "1rem",
  },
});

const AddContent = React.forwardRef(({ type }, ref) => {
  const [navType, setType] = useState("Ziynet");
  const [list, setList] = useState([]);
  const transactionType = type ? "Aliş" : "Satiş";

  const { refPayment, refEarn, refDescription } = ref.current;

  const handleSubTransactions = (id) => () => {
    if (!list.find((el) => el.id === id)) {
      const item = { ...items[id], transactionType };
      setList([...list, item]);
    }
  };

  return (
    <Box sx={style().box}>
      <Grid container spacing={1} alignItems="center">
        <AddTransactionNav setType={setType} />
        <ItemList
          handleSubTransactions={handleSubTransactions}
          type={navType}
          list={list}
        />
        <SelectedList list={list} setList={setList} />

        <Grid
          item
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="end"
        >
          <Grid item xs={4}>
            <TextField
              name="Odeme"
              inputRef={refPayment}
              id="formatted-numberformat-input"
              variant="standard"
              label="Odeme"
              focused
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                  style: style().textField,
                },
                endAdornment: "TL",
              }}
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="Kazanc"
              inputRef={refEarn}
              id="formatted-numberformat-input"
              variant="standard"
              label="Kazanc"
              focused
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                  style: style().textField,
                },
                endAdornment: "TL",
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="Toplam"
              label="Toplam"
              color="warning"
              focused
              id="formatted-numberformat-input"
              variant="standard"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                  style: style().textField,
                },
                endAdornment: "gr",
              }}
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              inputRef={refDescription}
              placeholder="Aciklama"
              name="description"
              label="Aciklama"
              variant="filled"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

export default AddContent;
