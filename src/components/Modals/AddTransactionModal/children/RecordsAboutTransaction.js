import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useSelectedList } from "../../../../hooks/useSelectedList";
import Controller from "../../../common/Controller/Controller";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";
import NumberFormatCustom2 from "../../../common/NumberInput/NumberFormatCustom2";

const style = () => ({
  textField: {
    textAlign: "center",
    fontSize: "1rem",
  },

  chip: {
    borderColor: "#b28900",
    width: ["100%", "80%"],
    justifyContent: "space-between",
    borderRadius: 1,
  },

  avatar: {
    bgcolor: "#b28900 !important",
    color: "white !important",
    justifyContent: "center",
    borderRadius: 1,
    minWidth: "fit-content",
    padding: "5px",
  },
});

const RecordsAboutTransaction = ({ register, errors, resetField, control }) => {
  const [checked, setChecked] = useState(false);
  const { sumAlis, sumSatis } = useSelectedList();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!event.target.checked) resetField("card");
  };

  const infoArray = [
    { name: "Alis", value: sumAlis },
    { name: "Satis", value: sumSatis },
    { name: "Total", value: Number((sumSatis - sumAlis).toFixed(3)) },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item container spacing={1} align="center">
        {infoArray.map((el, index) => (
          <Grid key={index} item xs={4}>
            <Chip
              avatar={<Avatar sx={style().avatar}> {el.name} </Avatar>}
              sx={style().chip}
              label={el.value}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        item
        container
        spacing={2}
        alignItems="stretch"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container alignItems="start" spacing={2} xs={12}>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            xs={4}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <CreditCardIcon fontSize="large" />
          </Grid>

          <Grid item xs={4}>
            <Controller
              {...{
                control,
                name: "card",
                register,
                rules: {
                  required: {
                    value: checked,
                    message: "Kontrol ediniz",
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    format={!checked && ""}
                    focused={checked}
                    required={checked}
                    label="Kart"
                    disabled={!checked}
                    error={errors.card && checked ? true : false}
                    helperText={checked ? errors.card?.message : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">TL</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <Controller
              {...{
                control,
                name: "cash",
                register,
                rules: {
                  required: {
                    value: !checked,
                    message: "Kontrol ediniz",
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    focused={!checked}
                    required={!checked}
                    label="Pesin"
                    error={errors.cash && !checked ? true : false}
                    helperText={!checked ? errors.cash?.message : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">TL</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={8}>
          <TextField
            name="description"
            fullWidth
            multiline
            rows={3}
            label="Aciklama"
            focused
            required
            variant="filled"
            {...register("description", {
              required: {
                value: true,
                message: "Kontrol ediniz",
              },
            })}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            InputProps={{
              inputProps: {
                style: { height: "60px" },
              },
            }}
          />
        </Grid>
        <Grid item container xs={4} spacing={2}>
          <Grid item>
            <Controller
              {...{
                control,
                name: "earn",
                register,
                rules: {
                  required: {
                    value: true,
                    message: "Kontrol ediniz",
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    focused={true}
                    required={true}
                    label="Kazanc"
                    error={errors.earn ? true : false}
                    helperText={errors.earn?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">TL</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              name="Alacak"
              label="Kalan"
              size="small"
              {...register("claim")}
              InputProps={{
                inputComponent: NumberFormatCustom,
                type: "gr",
                endAdornment: (
                  <InputAdornment position="end">gr</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RecordsAboutTransaction;
