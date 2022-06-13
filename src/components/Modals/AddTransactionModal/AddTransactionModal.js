import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./AddContent";
import Grid from "@mui/material/Grid";

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
  const [transactionType, setType] = useState(true);

  const handleChangeType = (event) => {
    setType(event.target.checked);
  };

  const handleSubmit = () => {
    addNewTransaction(test);
  };

  const getTitle = () => (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs="auto">
        <Typography>Yeni islem</Typography>
      </Grid>
      <Grid item container alignItems="center" xs={5}>
        <Typography>Alis</Typography>
        <Switch
          checked={transactionType}
          onChange={handleChangeType}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography>Satis</Typography>
      </Grid>
    </Grid>
  );

  const getFormContent = () => (
    <Box spacing={2} alignItems="center">
      <AddContent />
      <TextField placeholder="Aciklama" name="description" label="Aciklama" />
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
