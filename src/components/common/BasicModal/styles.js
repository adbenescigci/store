export const modalStyles = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    height: "90%",
    maxHeight: 600,
  },
  inputFields: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginBottom: "15px",
    ".MuiInput-root": {
      marginBottom: "20px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
};
