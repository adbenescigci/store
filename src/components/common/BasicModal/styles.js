export const modalStyles = (type) => ({
  wrapper: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -30%)",
    width: ["90%", "50%"],
    bgcolor: "#fff8e1",
    color: "#b28900",
    borderRadius: 1,
    boxShadow: 24,
    p: [Number(`${type === "filter" ? 3 : 1}`), 4],
    display: "flex",
    flexDirection: "column",
    overflow: `${type === "filter" ? "visible" : "auto"}`,
    maxHeight: "90%",
    "& > * ": {
      fontFamily: "Roboto",
    },
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
    bottom: "1px",
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "10px",
    zIndex: 10,
    padding: 1,
    ".MuiButton-text": {
      color: "#212121",
    },
    ".MuiButton-text:hover": {
      fontWeight: 700,
      color: "#b28900",
    },
  },
});
