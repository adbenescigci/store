import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../common/NumberInput/NumberFormatCustom";

const style = (el) => ({
  chip: {
    width: "100%",
    justifyContent: el === "label" ? "center" : "space-between",
    bgcolor: el === "label" && "#424242!important",
  },
  avatar: {
    bgcolor: "#607d8b !important",
    display: `${!el?.history ? "none" : ""}`,
  },
  grid: {
    p: 0,
  },
});
const label = [
  { name: "Ürünler", gSize: 4 },
  { name: "gr/ad", gSize: 2 },
  { name: "milem", gSize: 2 },
  { name: "has", gSize: 2 },
  { name: "satiş", gSize: 2 },
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
                onDelete={handleDelete(el.id)}
                avatar={
                  <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={el.amount}
                onChange={handleChange("amount", index)}
                sx={style().textField}
                name={el.id.toString()}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  type: el.unit,
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
                />
              )}
            </Grid>

            <Grid item xs={2}>
              <TextField
                value={(
                  (el.weight
                    ? (el.weight / 24) * 22
                    : el.setting / 24 + el.workship / 1000) * el.amount
                ).toFixed(3)}
                type="tel"
                size="small"
                sx={style().textField}
                variant="standard"
              />
            </Grid>

            <Grid item width="fit-content" xs={2}>
              <TextField
                value={(
                  (el.setting / 24 + el.workship / 1000) *
                  el.amount
                ).toFixed(2)}
                type="tel"
                variant="standard"
                size="small"
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SelectedList;
