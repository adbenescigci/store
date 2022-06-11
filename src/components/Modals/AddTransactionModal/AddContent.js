import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { items } from "../const/itemsList.js";

const AddContent = () => {
  const [list, setList] = useState([]);
  const [setting, setSetting] = useState("24");
  const [value, setValue] = useState(0);

  const handleSubTransactions = (id) => {
    if (!list.includes(items[id])) setList([...list, items[id]]);
  };

  const handleDelete = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
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
              height: "25px",
              backgroundColor: "primary.main",
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {["24", "22", "18", "14"].map((el, index) => (
              <BottomNavigationAction
                key={index}
                sx={{
                  color: "#c6d8e7",
                  "&.Mui-selected": {
                    color: "white",
                  },
                }}
                onClick={() => setSetting(el)}
                label={`${el} Ayar`}
              />
            ))}
          </BottomNavigation>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          {items
            .filter((el) => el.setting === setting)
            .map((el, index) => (
              <Grid item container key={index} xs={3}>
                <Chip
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  avatar={
                    <Avatar>
                      {el.history ? el.history.charAt(0) : el.setting}
                    </Avatar>
                  }
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
            <Grid container item key={index} alignItems="center">
              <Grid item xs>
                <Chip
                  color="primary"
                  label={`${
                    el.history ? el.label : `${el.label} ${el.setting}`
                  }`}
                  variant="outlined"
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
              <Grid item xs>
                test
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddContent;
