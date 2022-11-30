import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommonButton from "../CommonButton/CommonButton";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
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

        <Box sx={modalStyles().buttons}>
          {type !== "filter" ? (
            <>
              <CommonButton
                disabled={isSubmitButtonDisabled}
                onClick={onSubmit}
              >
                Onayla
              </CommonButton>
              <CommonButton onClick={onClose}>Iptal</CommonButton>
            </>
          ) : (
            <CommonButton
              onClick={onClose}
              sx={{
                color: "white ! important",
                position: "absolute",
                top: "-8%",
                left: ["93%", "96%"],
              }}
            >
              <CloseIcon />
            </CommonButton>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
