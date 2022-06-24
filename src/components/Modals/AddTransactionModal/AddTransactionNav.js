import { useState } from "react";
import Grid from "@mui/material/Grid";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WatchIcon from "@mui/icons-material/Watch";
import Divider from "@mui/material/Divider";

const style = (el) => ({
  bottomNavigation: {
    height: "40px",
    borderRadius: 1,
    bgcolor: "black",
    opacity: "0.78",
  },
  bottomNavigationAction: {
    minWidth: "45px",
    color: "#c6d8e7",
    "&.Mui-selected": {
      color: "#b28900",
    },
  },
});

const AddTransactionNav = ({ setType }) => {
  const [value, setValue] = useState(0);
  return (
    <>
      <Grid item xs={12} justifyContent="center">
        <BottomNavigation
          sx={style().bottomNavigation}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {["Ziy", "Ata", "22", "18", "14", "24", "Saat"].map((el, index) => (
            <BottomNavigationAction
              key={index}
              sx={style().bottomNavigationAction}
              onClick={() => setType(el)}
              label={el === "Saat" ? <WatchIcon fontSize="small" /> : el}
            />
          ))}
        </BottomNavigation>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default AddTransactionNav;
