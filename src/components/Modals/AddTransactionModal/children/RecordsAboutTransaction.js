import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Checkbox from "@mui/material/Checkbox";
import { useSelectedList } from "../../../../hooks/useSelectedList";
import BasicRecordItem from "../../../common/BasicRecordItem/BasicRecordItem";
import NumberFormatCustom from "../../../common/NumberInput/NumberFormatCustom";

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

const RecordsAboutTransaction = ({ register, errors, resetField }) => {
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

        <Grid item container spacing={2} xs={12}>
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

          <BasicRecordItem
            name="Odeme Kredi"
            label="Kredi"
            xs={4}
            focused={checked}
            required={checked}
            register={register}
            registerName="card"
            requiredData={{
              value: checked,
              message: "Kontrol ediniz",
            }}
            error={errors.card ? true : false}
            helperText={errors.card?.message}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">TL</InputAdornment>,
            }}
          />

          <BasicRecordItem
            name="Odeme Pesin"
            label="Pesin"
            xs={4}
            focused={!checked}
            required={!checked}
            register={register}
            registerName="cash"
            requiredData={{
              value: !checked,
              message: "Kontrol ediniz",
            }}
            error={errors.cash ? true : false}
            helperText={errors.cash?.message}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">TL</InputAdornment>,
            }}
          />
        </Grid>

        <BasicRecordItem
          name="description"
          fullWidth={true}
          multiline={true}
          rows={3}
          xs={8}
          label="Aciklama"
          required={true}
          register={register}
          registerName="description"
          requiredData="Kontrol ediniz"
          variant="filled"
          error={errors.description ? true : false}
          helperText={errors.description?.message}
          InputProps={{
            inputProps: {
              style: { height: "60px" },
            },
          }}
        />
        <Grid item container xs={4} spacing={2}>
          <BasicRecordItem
            name="Kazanc"
            label="Kazanc"
            focused={true}
            required={true}
            register={register}
            registerName="earn"
            requiredData="Kontrol ediniz"
            error={errors.earn ? true : false}
            helperText={errors.earn?.message}
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">TL</InputAdornment>,
            }}
          />
          <BasicRecordItem
            name="Alacak"
            label="Kalan"
            register={register}
            registerName="claim"
            requiredData={false}
            InputProps={{
              inputComponent: NumberFormatCustom,
              type: "gr",
              endAdornment: <InputAdornment position="end">gr</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RecordsAboutTransaction;
