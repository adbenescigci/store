import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

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
  const [transactionType, setType] = useState(false);

  const handleChangeType = (event) => {
    setType(event.target.checked);
  };

  const handleSubmit = () => {
    addNewTransaction(test);
  };

  const style = (el) => ({
    chip: {
      width: "70px",
      fontWeight: "700",
      color:
        (el === "alis" && transactionType) ||
        (el === "satis" && !transactionType)
          ? "#b28900"
          : "#cfd8dc",
      borderColor:
        (el === "alis" && transactionType) ||
        (el === "satis" && !transactionType)
          ? "#b28900"
          : "#cfd8dc",
    },
    switch: {},
  });

  const getTitle = () => (
    <Grid container justifyContent="center" alignItems="center">
      <Chip
        sx={style("satis").chip}
        variant="outlined"
        size="small"
        label="Satiş"
      />
      <Switch
        sx={style().switch}
        checked={transactionType}
        onChange={handleChangeType}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Chip
        sx={style("alis").chip}
        variant="outlined"
        size="small"
        label="Alis"
      />
    </Grid>
  );

  const getFormContent = () => (
    <Box spacing={2} alignItems="center">
      <AddContent type={transactionType} />
      <TextField
        fullWidth
        placeholder="Aciklama"
        name="description"
        label="Aciklama"
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title={getTitle()}
      content={getFormContent()}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransactionModal;
