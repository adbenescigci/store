import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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

    MuiIcon: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "&>*": { flexDirection: "row" },
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
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    info: {
      main: "#b2ff59",
    },
    info2: {
      main: "#e53935",
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

  spacing: 4,
  //theme.spacing(4)
});
