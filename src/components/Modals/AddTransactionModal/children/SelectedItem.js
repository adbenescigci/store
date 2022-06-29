import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import { memo } from "react";

const style = (el, item) => ({
  chip: {
    width: "100%",
    justifyContent: "space-between",
    opacity: "0.88",
    borderRadius: "16px",
    color: "#b28900",
    borderColor: "#b28900",
  },
  avatar: {
    bgcolor: "#b28900 !important",
    color: "white !important",
    display: `${!el?.history ? "none" : ""}`,
  },
  textField: {
    textAlign: "center",
    padding: "2px",
    fontWeight: el === "has" ? 700 : 400,
    color: item?.transactionType === "satis" ? "#212121" : "white",
    backgroundColor: item?.transactionType === "alis" && "#d32f2f",
    borderRadius: 3,
  },
});

const SelectedItem = ({ el, index, handleDelete, handleChange }) => {
  console.log("test");
  return (
    <Grid container item spacing={1} alignItems="center">
      <Grid item xs={4}>
        <Chip
          sx={style().chip}
          size="small"
          label={` ${el.type.substring(0, 3)} ${el.label} `}
          variant="outlined"
          onDelete={handleDelete(el.id)}
          avatar={
            <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
          }
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          value={el.amount}
          onChange={handleChange("amount", index)}
          name={el.id.toString()}
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
            inputProps: {
              style: style("", el).textField,
            },
            type: el.unit,
          }}
          variant="filled"
          size="small"
        />
      </Grid>

      <Grid item xs={2}>
        {el.unit === "gr" && (
          <TextField
            value={el.workship}
            onChange={handleChange("workship", index)}
            type="tel"
            variant="filled"
            size="small"
            InputProps={{
              inputProps: {
                style: style("", el).textField,
              },
            }}
          />
        )}
      </Grid>

      <Grid item xs={3}>
        <TextField
          value={(
            (el.weight
              ? (el.weight * 22) / 24
              : el.setting / 24 + el.workship / 1000) * el.amount
          ).toFixed(3)}
          type="tel"
          size="small"
          variant="filled"
          InputProps={{
            inputProps: {
              style: style("has", el).textField,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default memo(SelectedItem);
