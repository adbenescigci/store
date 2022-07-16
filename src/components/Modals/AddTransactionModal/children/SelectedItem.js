import { memo } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import { useSelectedList } from "../../../../hooks/useSelectedList";

const style = (el) => ({
  chip: {
    width: "100%",
    justifyContent: "space-between",
    borderRadius: "16px",
    borderColor: "#b28900",
    color: "#424242",
  },
  chipTotal: {
    width: "100%",
    justifyContent: "center",
    borderRadius: 1,
    borderColor: "#b28900",
    color: "#424242",
  },
  chipType: {
    width: ["90", "70%"],
    justifyContent: "center",
    borderRadius: 1,
    bgcolor: el.transactionType === "Aliş" && "#b28900",
    color: el.transactionType !== "Aliş" ? "#424242" : "white",
  },
  avatar: {
    bgcolor: "#b28900 !important",
    color: "white !important",
    display: `${!el?.history ? "none" : ""}`,
  },
  textField: {
    textAlign: "center",
    padding: "2px",
    fontWeight: 300,
    color: "#424242",
    borderRadius: 3,
  },
});

const SelectedItem = ({ el, index }) => {
  const { handleDelete, handleChange } = useSelectedList();

  return (
    <Grid container item spacing={1} alignItems="center">
      <Grid item align="center" xs={2}>
        <Chip sx={style(el).chipType} size="small" label={el.transactionType} />
      </Grid>
      <Grid item xs={4}>
        <Chip
          sx={style(el).chip}
          size="small"
          label={` ${el.type.substring(0, 3)} ${el.label}  `}
          onDelete={handleDelete(el.id)}
          avatar={
            <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
          }
        />
      </Grid>
      <Grid item xs>
        <TextField
          value={el.amount}
          onChange={handleChange("amount", index)}
          name={el.id.toString()}
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
            inputProps: {
              style: style(el).textField,
            },
            type: el.unit,
          }}
          variant="filled"
          size="small"
        />
      </Grid>

      <Grid item xs>
        {el.unit === "gr" && (
          <TextField
            value={el.workship}
            onChange={handleChange("workship", index)}
            type="tel"
            variant="filled"
            size="small"
            InputProps={{
              inputProps: {
                style: style(el).textField,
              },
            }}
          />
        )}
      </Grid>
      <Grid item xs>
        <Chip sx={style(el).chipTotal} size="small" label={el.total} />
      </Grid>
    </Grid>
  );
};

export default memo(SelectedItem);
