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
    borderRadius: 1,
    color: "#b28900",
    borderColor: "#b28900",
  },
  avatar: {
    bgcolor: "#b28900",
    color: "white !important",
    display: `${!el.history ? "none" : ""}`,
  },
});

const ItemList = ({ handleSubTransactions, type }) => {
  return (
    <>
      <Grid
        item
        container
        justifyContent="center"
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
      >
        {items
          .filter((el) => el.type.includes(type))
          .map((el, index) => (
            <Grid item container key={index} xs={3} md={2}>
              <Chip
                sx={style(el).chip}
                avatar={
                  <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
                }
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
