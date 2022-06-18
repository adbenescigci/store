import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { items } from "../const/itemsList.js";

const style = (el) => ({
  chip: {
    fontSize: "0.7rem",
    width: "100%",
    justifyContent: `${el.history ? "start" : "center"}`,
  },
  avatar: {
    bgcolor: "#5393ff !important",
    display: `${!el.history ? "none" : ""}`,
  },
});

const ItemList = ({ handleSubTransactions, type }) => {
  return (
    <>
      <Grid item container xs={12} justifyContent="center">
        {items
          .filter((el) => el.type.includes(type))
          .map((el, index) => (
            <Grid item container key={index} xs={3}>
              <Chip
                sx={style(el).chip}
                avatar={
                  <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
                }
                color="primary"
                onClick={handleSubTransactions(el.id)}
                key={el.id}
                size="small"
                label={el.label}
                variant="outlined"
              />
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  );
};

export default ItemList;
