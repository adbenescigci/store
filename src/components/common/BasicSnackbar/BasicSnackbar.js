import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="standard" ref={ref} {...props} />;
});

const BasicSnackbar = ({ onClose, open, severity, message }) => {
  return (
    <>
      <Snackbar
        sx={{ marginBottom: "30px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{ width: ["95%", "100%"] }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BasicSnackbar;
