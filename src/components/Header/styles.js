export const styles = {
  box: {
    width: "100%",
    display: "flex",
    position: "sticky",
    top: "0",
    zIndex: "1",
    flexDirection: "row",
    fontSize: ["13px", "15px"],
    fontWeight: "700",
    borderBottom: [0, 7],
    color: "#b28900",
    backgroundColor: "#fff8e1",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    height: ["50px", "65px"],
    margin: "0",

    //label
    label: {
      fontSize: ["29px", "37px"],
    },

    ".MuiAvatar-circular": {
      backgroundColor: "#b28900 ",
      color: "white",
      padding: ["1px", "5px"],
      borderColor: "#b28900",
      float: "right",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "white",
        color: "#b28900",
      },
    },
  },

  grid: {
    textAlign: "center",
    opacity: 0.78,
  },
};
