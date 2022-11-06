import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommonButton from "../CommonButton/CommonButton";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyles } from "./styles";

const BasicModal = ({
  type = "",
  open,
  onClose,
  title,
  content,
  onSubmit,
  isSubmitButtonDisabled,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles(type).wrapper}>
        {title}
        {content}
        {type !== "filter" ? (
          <Box sx={modalStyles().buttons}>
            <CommonButton disabled={isSubmitButtonDisabled} onClick={onSubmit}>
              Onayla
            </CommonButton>
            <CommonButton onClick={onClose}>Iptal</CommonButton>
          </Box>
        ) : (
          <CommonButton
            onClick={onClose}
            sx={{
              color: "white",
              position: "absolute",
              top: "-10%",
              left: ["92%", "95%"],
            }}
          >
            <CloseIcon />
          </CommonButton>
        )}
      </Box>
    </Modal>
  );
};

export default BasicModal;
