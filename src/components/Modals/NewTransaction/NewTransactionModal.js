import React, { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BasicModal from "../../../components/common/BasicModal/BasicModal";

const test = {
  title: "Deneme8",
  description: "Dugun",
  user: "Yusuf",
  transactionType: "alis",
  weight: 100,
  goldSetting: 22,
  goldType: "bileklik",
  amount: 3,
  currency: "TL",
};

const NewTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const sellerRef = useRef(null);
  const itemRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = () => {
    addNewTransaction(test);
  };

  const getFormContent = () => (
    <Box>
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
