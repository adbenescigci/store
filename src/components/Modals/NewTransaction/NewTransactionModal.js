import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import BasicModal from "../../../components/common/BasicModal/BasicModal";

const ControlledSwitches = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

const NewTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const sellerRef = useRef(null);
  const itemRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = () => {
    addNewTransaction(itemRef.current.value);
  };

  const getFormContent = () => (
    <Box>
      <FormControlLabel
        control={<ControlledSwitches sx={{ m: 1 }} defaultChecked />}
        label="MUI switch"
      />
      <TextField
        placeholder="Satici"
        name="seller"
        label="Satici"
        required
        inputRef={sellerRef}
      />
      <TextField
        placeholder="Urun Cinsi"
        name="itemID"
        label="Urun Cinsi"
        required
        inputRef={itemRef}
      />
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
      subTitle="Bilgileri girip onaylayiniz"
      content={getFormContent()}
      onSubmit={handleSubmit}
    />
  );
};

export default NewTransactionModal;
