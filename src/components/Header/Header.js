import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styles } from "./styles";
import Grid from "@mui/material/Grid";

const Header = () => {
  return (
    <Box sx={styles.box}>
      <Grid sx={styles.grid} alignItems="center" spacing={1} container>
        <Grid item xs={10}>
          <label>BURÇ</label> KUYUMCULUK
        </Grid>
        <Grid item xs={2}>
          <Avatar>RC</Avatar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
