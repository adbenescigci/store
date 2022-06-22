import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommonButton from "../CommonButton/CommonButton";
import Divider from "@mui/material/Divider";
import { modalStyles } from "./styles";
const BasicModal = ({ open, onClose, title, content, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles.wrapper}>
        {title}
        <Divider />
        {content}
        <Box sx={modalStyles.buttons}>
          <CommonButton variant="contained" onClick={onSubmit}>
            Submit
          </CommonButton>
          <CommonButton onClick={onClose}>Cancel</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
