export const styles = {
  iconButton: {
    "& .MuiSvgIcon-root": {
      fontSize: ["30px", "35px"],
    },
  },
  summaryTable: {
    height: ["calc(100vh - 175px)", "calc(100vh - 150px)"],
    width: "100%",
    bgcolor: "white",

    "& .MuiDataGrid-row--true": {
      backgroundColor: "#ef5350",
      color: "white",

      "&.MuiDataGrid-row.Mui-selected": {
        backgroundColor: "#d32f2f",
      },
      "& .MuiButton-root": {
        color: "white",
        "&: hover": {
          color: "#cfd8dc",
        },
      },
      "&:hover": {
        backgroundColor: "#e53935",
      },
    },

    "& .MuiButton-root": {
      alignItems: "left",
      minWidth: "10px",
      color: "#9e9e9e",
      "&: hover": {
        color: "#ef5350",
      },
    },
  },
};
