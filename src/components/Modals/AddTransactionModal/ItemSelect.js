import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { items } from "../const/itemsList.js";

const ItemSelect = ({ onChange }) => {
  const [item, setItem] = useState("");
  const [setting, setSetting] = useState("14");

  const handleChange = (event) => {
    setItem(event.target.value);
    onChange(event.target.value);
  };

  const handleSetting = (e) => {
    setItem("");
    setSetting(e.target.value);
  };
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={4}>
        <Select
          size="small"
          value={setting}
          onChange={handleSetting}
          label="Ayar"
        >
          <MenuItem value="14">14</MenuItem>
          <MenuItem value="18">18</MenuItem>
          <MenuItem value="22">22</MenuItem>
          <MenuItem value="24">24</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={8} justifyContent="center">
        <Select
          variant="standard"
          size
          id="select"
          value={item}
          label="Urun"
          onChange={handleChange}
        >
          {items
            .filter((el) => el.view !== "button" && el.setting === setting)
            .map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default ItemSelect;
