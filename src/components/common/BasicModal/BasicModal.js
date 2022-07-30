import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommonButton from "../CommonButton/CommonButton";
import { modalStyles } from "./styles";

const BasicModal = ({
  open,
  onClose,
  title,
  content,
  onSubmit,
  isSubmitButtonDisabled,
}) => {
  const [isDisabled, setDisable] = React.useState(isSubmitButtonDisabled);

  const onClick = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    setDisable(isSubmitButtonDisabled);
  }, [isSubmitButtonDisabled]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles.wrapper}>
        {title}
        {content}
        <Box sx={modalStyles.buttons}>
          <CommonButton disabled={isDisabled} onClick={onClick}>
            Onayla
          </CommonButton>
          <CommonButton onClick={onClose}>Iptal</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
