export const styles = {
  summaryTable: {
    height: ["75vh", "80vh"],
    width: "100%",
    maxWidth: "720px",
    // margin: "auto",

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
