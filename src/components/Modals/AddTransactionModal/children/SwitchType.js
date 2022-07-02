import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const SwitchType = ({ transactionType, setType }) => {
  const style = (el) => ({
    chip: {
      width: "70px",
      fontWeight: "700",
      color:
        (el === "alis" && transactionType) ||
        (el === "satis" && !transactionType)
          ? "#b28900"
          : "#cfd8dc",
      borderColor:
        (el === "alis" && transactionType) ||
        (el === "satis" && !transactionType)
          ? "#b28900"
          : "#cfd8dc",
    },
  });

  const handleChangeType = (event) => {
    setType(event.target.checked);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Chip
        sx={style("satis").chip}
        variant="outlined"
        size="small"
        label="Satiş"
      />
      <Switch
        sx={style().switch}
        checked={transactionType}
        onChange={handleChangeType}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Chip
        sx={style("alis").chip}
        variant="outlined"
        size="small"
        label="Alis"
      />
    </Grid>
  );
};

export default SwitchType;
