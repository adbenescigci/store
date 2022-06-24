import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../common/NumberInput/NumberFormatCustom";

const style = (el) => ({
  grid: {
    p: 0,
  },
  chip: {
    width: "100%",
    justifyContent: el === "label" ? "center" : "space-between",
    bgcolor: el === "label" && "#212121",
    borderRadius: el !== "label" && "16px",
    color: el === "label" ? "#c6d8e7" : "#b28900",
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
    color: "#212121",
  },
});
const label = [
  { name: "Ürünler", gSize: 4 },
  { name: "gr/ad", gSize: 3 },
  { name: "milem", gSize: 2 },
  { name: "has", gSize: 3 },
];

const SelectedList = ({ list, handleDelete, handleChange }) => {
  return (
    <>
      {list.length > 0 && (
        <Grid item container xs={12}>
          {label.map((el, index) => (
            <Grid key={index} item xs={el.gSize}>
              <Chip
                sx={style("label").chip}
                size="small"
                color="primary"
                label={el.name}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid item container spacing={1} direction="column-reverse" xs={12}>
        {list.map((el, index) => (
          <Grid container item key={index} spacing={1} alignItems="center">
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
                    style: style().textField,
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
                      style: style().textField,
                    },
                  }}
                />
              )}
            </Grid>

            <Grid item xs={3}>
              <TextField
                value={(
                  (el.weight
                    ? (el.weight / 24) * 22
                    : el.setting / 24 + el.workship / 1000) * el.amount
                ).toFixed(3)}
                type="tel"
                size="small"
                variant="filled"
                InputProps={{
                  inputProps: {
                    style: style("has").textField,
                  },
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SelectedList;
