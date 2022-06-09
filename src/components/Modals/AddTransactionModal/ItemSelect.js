import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
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
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        minWidth: "150px",
      }}
    >
      <Select
        variant="standard"
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
      <Divider orientation="vertical" flexItem />
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
    </Stack>
  );
};

export default ItemSelect;
