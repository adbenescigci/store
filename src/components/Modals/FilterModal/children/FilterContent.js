import { useState } from "react";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import { transT, goldT, paymentT } from "./consts";
import ScaleIcon from "@mui/icons-material/Scale";
import NumberFormatCustom2 from "../../../common/NumberInput/NumberFormatCustom2";
import CommonButton from "../../../common/CommonButton/CommonButton";
import Controller from "../../../common/Controller/Controller";

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const FilterContent = ({ formData, onClose }) => {
  const [goldTypes, setGoldTypes] = useState(() => goldT);
  const [transTypes, setTransTypes] = useState(() => transT);
  const [paymentTypes, setPaymentTypes] = useState(() => paymentT);
  const { register, errors, control, getValues } = formData;
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (el) => (event, data) => {
    if (data.length !== 0) {
      if (el === "gold") setGoldTypes(data);
      if (el === "transaction") setTransTypes(data);
      if (el === "payment") setPaymentTypes(data);
    } else enqueueSnackbar("En az 1 tercih ", { variant: "info" });
    return;
  };

  const handleDefault = () => {
    setGoldTypes(goldT);
    setTransTypes(transT);
    setPaymentTypes(paymentT);
  };

  const array = [
    {
      name: "Cins ve Ayar",
      value: goldTypes,
      data: goldT,
      ref: "gold",
      xs: 12,
    },
    {
      name: "İşlem Yönü",
      value: transTypes,
      data: transT,
      ref: "transaction",
      xs: 5.5,
    },
    {
      name: "Ödeme",
      value: paymentTypes,
      data: paymentT,
      ref: "payment",
      xs: 5.5,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingTop: 3 }}
      alignItems="center"
      justifyContent="space-between"
    >
      {(goldTypes.length !== 7 ||
        paymentTypes.length !== 2 ||
        transTypes.length !== 2) && (
        <CommonButton
          sx={{
            position: "absolute",
            bottom: "6.5%",
            left: "1%",
            zIndex: "9999 ! important",
          }}
          onClick={handleDefault}
        >
          <RefreshIcon /> Varsayilan
        </CommonButton>
      )}

      {array.map((el, index) => (
        <Grid
          key={index}
          container
          item
          xs={el.xs}
          alignItems="center"
          spacing={1}
        >
          <Grid item container xs={12}>
            <ToggleButtonGroup
              fullWidth
              value={el.value}
              onChange={handleChange(el.ref)}
            >
              {el.data.map((el, index) => (
                <ToggleButton key={index} value={el} aria-label={el}>
                  {el}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      ))}

      <Grid container xs={12} item spacing={3}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="start"
        >
          <Grid item xs={5} justifyContent="center">
            <Controller
              {...{
                control,
                name: "min",
                register,
                rules: {
                  required: {
                    value: true,
                    message: "Kontrol ediniz",
                  },
                  max: {
                    value: getValues("max"),
                    message: "En fazla değerinden az olmalıdır.",
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    label="En az"
                    defaultValue={0}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    focused
                    error={errors.min ? true : false}
                    helperText={errors.min ? errors.min.message : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>

          <Grid item xs={2} sx={{ textAlign: "center", paddingTop: "10px" }}>
            <ScaleIcon />
          </Grid>

          <Grid item xs={5} sx={{ paddingTop: "0px", textAlign: "right" }}>
            <Controller
              {...{
                control,
                name: "max",
                register,
                rules: {
                  required: {
                    value: true,
                    message: "Kontrol ediniz",
                  },
                  min: {
                    value: getValues("min"),
                    message: "En az degerinden fazla olmalıdır",
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    label="En fazla"
                    defaultValue={10000}
                    decimalScale={2}
                    focused
                    fixedDecimalScale={true}
                    error={errors.max ? true : false}
                    helperText={errors.max ? errors.max.message : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterContent;

// <Grid item xs={7} justifyContent="center">
// <Controller
//   {...{
//     control,
//     name: "test",
//     register,
//     rules: {
//       required: true,
//     },
//     render: (props) => (
//       <FormControl
//         error={errors.test ? true : false}
//         sx={{ width: "100%", maxWidth: "100%" }}
//       >
//         <InputLabel id="demo-multiple-select">
//           Manager(s)
//         </InputLabel>
//         <Select
//           {...props}
//           multiple
//           fullWidth
//           defaultOpen={true}
//           value={transT}
//           // onChange={handleManagerChange}
//           input={<OutlinedInput label="Test" />}
//           renderValue={(selected) => {
//             console.log(selected);
//           }}
//         >
//           {transT.map((el, index) => (
//             <ToggleButton key={index} value={el} aria-label={el}>
//               {el}
//             </ToggleButton>
//           ))}
//         </Select>
//       </FormControl>
//     ),
//   }}
// />
// </Grid>
