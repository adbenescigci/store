import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ItemList from "./ItemList";
import SelectedList from "./SelectedList";
import AddTransactionNav from "./AddTransactionNav";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import { items } from "../../const/itemsList.js";
import { useSelectedList } from "../../../../hooks/useSelectedList";

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

  const { list, setList } = useSelectedList();
  const { refPayment, refEarn, refDescription } = ref.current;
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
          <>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="Toplam"
                  label="Toplam"
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
              <Grid item xs={4}>
                <TextField
                  name="Toplam"
                  label="Toplam"
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
              <Grid item xs={4}>
                <TextField
                  name="Toplam"
                  label="Toplam"
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
            </Grid>
            <Grid
              item
              container
              spacing={3}
              alignItems="stretch"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  inputRef={refDescription}
                  placeholder="Aciklama"
                  name="description"
                  label="Aciklama"
                  variant="filled"
                  InputProps={{
                    inputProps: {
                      style: { height: "60px" },
                    },
                  }}
                />
              </Grid>
              <Grid item container xs={4}>
                <Grid item xs={12}>
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

                <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
});

export default AddContent;
