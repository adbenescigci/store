import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WatchIcon from "@mui/icons-material/Watch";
import { items } from "../const/itemsList.js";
import NumberFormatCustom from "../../common/NumberInput/NumberFormatCustom";

import InputAdornment from "@mui/material/InputAdornment";

const AddContent = () => {
  const [list, setList] = useState([]);
  const [type, setType] = useState("Ziynet");
  const [value, setValue] = useState(0);
  const [values, setValues] = useState();

  const handleSubTransactions = (id) => {
    if (!list.includes(items[id])) setList([...list, items[id]]);
    setValues({ ...values, [id]: "" });
  };

  const handleDelete = (id) => {
    const newList = list.filter((el) => el.id !== id);
    setList(newList);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& > *": {
          m: 1,
        },
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item justifyContent="center">
          <BottomNavigation
            sx={{
              height: "40px",
              backgroundColor: "primary.main",
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {["Ziy", "Ata", "22", "18", "14", "24", "Saat"].map((el, index) => (
              <BottomNavigationAction
                key={index}
                sx={{
                  minWidth: "45px",
                  color: "#c6d8e7",
                  "&.Mui-selected": {
                    color: "white",
                  },
                }}
                onClick={() => setType(el)}
                label={el === "Saat" ? <WatchIcon fontSize="small" /> : el}
              />
            ))}
          </BottomNavigation>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          {items
            .filter((el) => el.type.includes(type))
            .map((el, index) => (
              <Grid item container key={index} xs={3}>
                <Chip
                  sx={{
                    fontSize: "0.7rem",
                    width: "100%",
                    justifyContent: `${el.history ? "start" : "center"}`,
                  }}
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "#5393ff !important",
                        display: `${!el.history ? "none" : ""}`,
                      }}
                    >
                      {el.history?.charAt(0)}
                    </Avatar>
                  }
                  color="primary"
                  onClick={() => handleSubTransactions(el.id)}
                  key={el.id}
                  size="small"
                  label={el.label}
                  variant="outlined"
                />
              </Grid>
            ))}
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          {list.map((el, index) => (
            <Grid container item key={index} spacing={1} alignItems="center">
              <Grid item xs={4}>
                <Chip
                  sx={{
                    fontSize: "0.7rem",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  color="primary"
                  label={` ${el.type.substring(0, 3)} ${el.label} `}
                  variant="outlined"
                  size="small"
                  onDelete={() => handleDelete(el.id)}
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "#5393ff !important",
                        display: `${!el.history ? "none" : ""}`,
                      }}
                    >
                      {el.history?.charAt(0)}
                    </Avatar>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={values[el.id]}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                  name={el.id.toString()}
                  id={`${el.unit === "gr" ? 2 : 0}`}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddContent;
