import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../common/NumberInput/NumberFormatCustom";
import InputAdornment from "@mui/material/InputAdornment";

const style = (el) => ({
  chip: {
    width: "100%",
    justifyContent: "space-between",
  },
  avatar: {
    bgcolor: "#5393ff !important",
    display: `${!el?.history ? "none" : ""}`,
  },
  textField: { width: "100%", textAlign: "end" },
  grid: {
    border: "1px solid #2196f3",
    p: 0,
  },
});

const SelectedList = ({ list, handleDelete, handleChange }) => {
  return (
    <Grid item container direction="column-reverse" xs={12}>
      {list.map((el, index) => (
        <Grid container item key={index} spacing={1} alignItems="center">
          <Grid item xs={4}>
            <Chip
              sx={style().chip}
              size="small"
              color="primary"
              label={` ${el.type.substring(0, 3)} ${el.label} `}
              variant="outlined"
              onDelete={() => handleDelete(el.id)}
              avatar={
                <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={el.amount}
              onChange={handleChange("amount", index)}
              sx={style().textField}
              name={el.id.toString()}
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
                type: el.unit,
                endAdornment: (
                  <InputAdornment position="end">
                    {el.unit.charAt(0)}
                  </InputAdornment>
                ),
              }}
              variant="standard"
              size="small"
            />
          </Grid>

          <Grid item xs={2}>
            {el.unit === "gr" && (
              <TextField
                value={el.workship}
                onChange={handleChange("workship", index)}
                type="tel"
                variant="standard"
                size="small"
                sx={style().textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
              />
            )}
          </Grid>

          <Grid item xs={3}>
            <TextField
              align="center"
              value={(
                (el.setting / 24 + el.workship / 1000) *
                el.amount
              ).toFixed(2)}
              type="tel"
              variant="standard"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end">h</InputAdornment>,
              }}
              sx={style().textField}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectedList;
