import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelectedList } from "../../../../hooks/useSelectedList";
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

// eslint-disable-next-line no-empty-pattern
const RecordsAboutTransaction = React.forwardRef(
  ({ register, errors }, ref) => {
    const { refPayment, refEarn, refDescription } = ref.current;
    const { sumAlis, sumSatis } = useSelectedList();

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
          spacing={3}
          alignItems="stretch"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              inputRef={refDescription}
              placeholder="Aciklama"
              name="description"
              multiline
              rows={3}
              label="Aciklama"
              variant="filled"
              InputProps={{
                inputProps: {
                  style: { height: "60px" },
                },
              }}
              required
              {...register("description")}
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item container xs={5} spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Odeme"
                inputRef={refPayment}
                id="paymentInput"
                label="Odeme"
                focused
                size="small"
                required
                {...register("payment")}
                error={errors.payment ? true : false}
                helperText={errors.payment?.message}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">TL</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="Kazanc"
                inputRef={refEarn}
                id="earnInput"
                label="Kazanc"
                focused
                size="small"
                required
                {...register("earn")}
                error={errors.earn ? true : false}
                helperText={errors.earn?.message}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">TL</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
);

export default RecordsAboutTransaction;
