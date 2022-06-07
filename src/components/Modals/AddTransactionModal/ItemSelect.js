import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { items } from "../const/itemsList.js";

const ItemSelect = ({ onChange }) => {
  const [item, setItem] = useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Diger</InputLabel>
        <Select
          labelId="items-select-label"
          id="select"
          value={item}
          label="Urun"
          onChange={handleChange}
        >
          {items
            .filter((el) => el.view === "select")
            .map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ItemSelect;
