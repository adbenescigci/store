import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import Divider from "@mui/material/Divider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const style = {
  chip: {
    width: "100%",
    "&>*": {
      padding: "5px",
    },
  },
};

const FilterContent = ({ formData, onClose }) => {
  const { register, errors, watch } = formData;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);

  const handleClick = () => {
    console.log("test", max, min);
  };

  useEffect(() => {
    const subscription = watch((data) => {
      setMin(data.min);
      setMax(data.max);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  let render = 1;
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid container item xs={12} alignItems="center" spacing={1}>
        <Grid item xs={12}>
          render {render++}{" "}
        </Grid>
        <Grid item xs={12}>
          <Divider light>
            <Chip label="Cins ve Ayar" color="primary" variant="outlined" />
          </Divider>
        </Grid>
        <Grid item xs={1.5} md={1}>
          <Checkbox defaultChecked />
        </Grid>
        {["Ziy", "Ata", "Saat", "22", "18", "14", "24"].map((el, index) => (
          <Grid key={index} item xs>
            <Chip
              sx={style.chip}
              variant="outlined"
              label={el}
              onClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container xs={5.5} item alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Divider light>
            <Chip label="Islem Yonu" color="primary" variant="outlined" />
          </Divider>
        </Grid>
        {["Alış", "Satış"].map((el, index) => (
          <Grid key={index} item xs>
            <Chip
              sx={style.chip}
              variant="outlined"
              label={el}
              onClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container xs={5.5} item alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Divider light>
            <Chip label="Odeme" color="primary" variant="outlined" />
          </Divider>
        </Grid>
        {["Nakit", "Kart"].map((el, index) => (
          <Grid key={index} item xs>
            <Chip
              sx={style.chip}
              variant="outlined"
              label={el}
              onClick={handleClick}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container xs={12} item spacing={3}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={3.4}>
            <TextField
              name="en az"
              {...register("min", {
                required: "required",
                validate: (value) => Number(value) < Number(max) || "Kontrol",
              })}
              label="En az (gr)"
              defaultValue={min}
              size="small"
              focused
              error={Number(max) <= Number(min) ? true : false}
              // InputProps={{
              //   inputComponent: NumberFormatCustom,
              //   type: "gr",
              // }}
            />
          </Grid>

          <Grid container item xs={0.4} sx={{ textAlign: "center" }}>
            <ArrowBackIosIcon />
          </Grid>

          <Grid item xs={2.4}>
            <Chip
              sx={{ width: "100%" }}
              label="Hacim"
              color="primary"
              variant="outlined"
            />
          </Grid>

          <Grid container item xs={0.4} alignItems="center">
            <ArrowBackIosIcon />
          </Grid>

          <Grid item xs={3.4}>
            <TextField
              name="en fazla"
              {...register("max", {
                required: "required",
                validate: (value) => Number(value) > Number(min) || "Kontrol",
              })}
              label="En fazla (gr)"
              size="small"
              defaultValue={max}
              focused
              error={Number(max) <= Number(min) ? true : false}
              // InputProps={{
              //   inputComponent: NumberFormatCustom,
              //   type: "gr",
              // }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterContent;
