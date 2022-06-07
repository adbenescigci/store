import { useState } from "react";
import Box from "@mui/material/Box";
import ItemSelect from "./ItemSelect";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import { items } from "../const/itemsList.js";

const ItemsGroup = () => {
  const [list, setList] = useState([]);

  const handleSubTransactions = (id) => {
    if (!list.includes(id)) setList([...list, id]);
  };

  const itemsCountable = items
    .filter((el) => el.view === "button" && el.type === "piece")
    .map((item, index) => (
      <Button onClick={() => handleSubTransactions(item.id)} key={item.id}>
        {item.label}
      </Button>
    ));

  const itemsWearable = items
    .filter((el) => el.view === "button" && el.type === "weight")
    .map((item, index) => (
      <Button onClick={() => handleSubTransactions(item.id)} key={item.id}>
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
      <ButtonGroup
        variant="contained"
        aria-label="vertical outlined button group"
      >
        {itemsCountable}
      </ButtonGroup>

      <Stack direction="row" spacing={1} alignItems="center">
        <ButtonGroup
          variant="contained"
          aria-label="vertical outlined button group"
        >
          {itemsWearable}
        </ButtonGroup>
        <ItemSelect onChange={handleSubTransactions} />
      </Stack>
      <Stack direction="column" alignItems="center">
        {list.map((el, index) => (
          <p key={index}>{items[el].label}</p>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemsGroup;
