export const modalStyles = {
  wrapper: {
    position: "absolute",
    top: ["30%", "35%"],
    left: "50%",
    transform: "translate(-50%, -30%)",
    width: ["90%", "50%"],
    bgcolor: "background.paper",
    boxShadow: 24,
    p: [1, 4],
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    maxHeight: "80%",
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
    position: "sticky",
    bottom: "1px",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "10px",
    background: "white",
    zIndex: 10,
    padding: 1,
    "&:hover": {
      background: "black",
    },
  },
};
