import { useState } from "react";
import Box from "@mui/material/Box";
import ItemSelect from "./ItemSelect";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { items } from "../const/itemsList.js";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ItemsGroup = () => {
  const [list, setList] = useState([]);
  const [history, setHistory] = useState("Yeni");
  const [type, setType] = useState("Cum");

  const handleSubTransactions = (id) => {
    if (!list.includes(items[id])) setList([...list, items[id]]);
  };

  const handleDelete = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const handleHistory = (e) => {
    setHistory(e.target.value);
  };
  const handleType = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const itemsButtons = items
    .filter(
      (el) => el.view === "button" && el.history === history && el.type === type
    )
    .map((item) => (
      <Button
        onClick={() => handleSubTransactions(item.id)}
        key={item.id}
        color="primary"
        size="small"
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
      <Stack direction="column" spacing={1} alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <FormGroup>
            <Select
              variant="standard"
              size="small"
              value={history}
              onChange={handleHistory}
              label="Tarih"
            >
              <MenuItem value="Yeni">Yeni</MenuItem>
              <MenuItem value="Eski">Eski</MenuItem>
            </Select>
            <Select
              variant="standard"
              size="small"
              value={type}
              onChange={handleType}
              label="Tarih"
            >
              <MenuItem value="Cum">Cum</MenuItem>
              <MenuItem value="Ata">Ata</MenuItem>
            </Select>
          </FormGroup>
          <Divider orientation="vertical" flexItem />
          <ButtonGroup
            size="small"
            variant="contained"
            aria-label="vertical outlined button group"
          >
            {itemsButtons}
          </ButtonGroup>
        </Stack>
        <ItemSelect onChange={handleSubTransactions} />
      </Stack>
      <Divider />
      <Stack direction="column" alignItems="center" spacing={1}>
        {list.map((el, index) => (
          <Stack key={index} direction="row" alignItems="center">
            <Chip
              color="primary"
              label={
                el.setting
                  ? `${el.label}`
                  : `${el.history} ${el.type} ${el.label}`
              }
              variant="outlined"
              onDelete={() => handleDelete(index)}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemsGroup;
