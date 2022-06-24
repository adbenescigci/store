import { createTheme } from "@mui/material/styles";

export const dashboardTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        contained: {
          backgroundColor: "#009be5",
          "&:hover": {
            backgroundColor: "#006db3",
          },
        },
      },
    },
    // MuiGrid: {
    //   styleOverrides: {
    //     "& .MuiGrid-item": {
    //       backgroundColor: "#006db3",
    //     },
    //   },
    // },
    // MuiBox: {
    //   styleOverrides: {
    //     padding: "0 !important",
    //   },
    // },
  },

  palette: {
    primary: {
      main: "#b28900",
    },
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },

  spacing: [4, 8, 12, 16, 20],
  //theme.spacing(4)
});
