import { useState } from "react";
import Box from "@mui/material/Box";
import ItemSelect from "./ItemSelect";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { items } from "../const/itemsList.js";
import Chip from "@mui/material/Chip";

import Checkbox from "@mui/material/Checkbox";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ItemsGroup = () => {
  const [list, setList] = useState([]);

  const handleSubTransactions = (id) => {
    if (!list.includes(items[id])) setList([...list, items[id]]);
  };

  const handleDelete = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleHistory = (index, value) => {
    let newList = [...list];
    newList[index].history = value;
    setList(newList);
  };

  const itemsButtons = items
    .filter((el) => el.view === "button")
    .map((item) => (
      <Button
        onClick={() => handleSubTransactions(item.id)}
        key={item.id}
        color="primary"
        aria-label="add"
      >
        {item.label}
      </Button>
    ));

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
      <Stack direction="row" spacing={1} alignItems="center">
        <ButtonGroup
          size="small"
          variant="contained"
          aria-label="vertical outlined button group"
        >
          {itemsButtons}
        </ButtonGroup>
        <ItemSelect onChange={handleSubTransactions} />
      </Stack>
      <Stack direction="column" alignItems="center" spacing={1}>
        {list.map((el, index) => (
          <Stack key={index} direction="row" alignItems="center">
            <Chip
              color="primary"
              label={el.label}
              variant="outlined"
              onDelete={() => handleDelete(index)}
            />
            <FormGroup>
              {el.history && (
                <Select
                  variant="standard"
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={el.history}
                  label="Tarih"
                  onChange={(e) => handleHistory(index, e.target.value)}
                >
                  <MenuItem value="Yeni">Yeni</MenuItem>
                  <MenuItem value="Eski">Eski</MenuItem>
                </Select>
              )}
            </FormGroup>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemsGroup;
