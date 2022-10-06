import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} variant="standard" ref={ref} {...props} />
));

const BasicSnackbar = ({ onClose, open, severity, message, action }) => {
  return (
    <>
      <Snackbar
        sx={{ marginBottom: "30px" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={onClose}
        autoHideDuration={3500}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          sx={{ width: ["95%", "100%"] }}
        >
          {message} {action}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BasicSnackbar;
