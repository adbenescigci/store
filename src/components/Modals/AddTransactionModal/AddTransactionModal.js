import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BasicModal from "../../common/BasicModal/BasicModal";
import ItemsGroup from "./ItemsGroup";

const test = {
  title: "moc",
  description: "Ahmet Dugun",
  user: "Ahmet",
  subTransactions: [
    {
      transactionType: "alis",
      goldType: "bileklik",
      amount: "200",
      workmanship: "50",
      goldSetting: 22,
    },
    {
      transactionType: "alis",
      goldType: "kunye",
      amount: "2500",
      workmanship: "90",
      goldSetting: 14,
    },
  ],
  payment: ["100USD", "2500TL"],
  paymentType: "cash",
};

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [checked, setChecked] = React.useState(true);
  const descriptionRef = useRef(null);

  const handleChangeType = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = () => {
    addNewTransaction(test);
  };

  const getFormContent = () => (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Alis</Typography>
        <Switch
          checked={checked}
          onChange={handleChangeType}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography>Satis</Typography>
      </Stack>
      <ItemsGroup />
      <TextField
        placeholder="Aciklama"
        name="description"
        label="Aciklama"
        inputRef={descriptionRef}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Yeni Islem"
      content={getFormContent()}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransactionModal;
