import { memo } from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import SelectedItem from "./SelectedItem";
import { useSelectedList } from "../../../../hooks/useSelectedList";

const style = () => ({
  chip: {
    width: "100%",
    justifyContent: "center",
    bgcolor: "#212121",
    borderRadius: 0,
    color: "#c6d8e7",
    borderColor: "#b28900",
  },
});

const label = [
  { name: "islem", gSize: 2 },
  { name: "ürünler", gSize: 4 },
  { name: "gr/ad", gSize: 3 },
  { name: "milem", gSize: 3 },
];

const SelectedList = () => {
  const { list } = useSelectedList();
  return (
    <>
      {list?.length > 0 && (
        <Grid item container xs={12}>
          {label.map((el, index) => (
            <Grid key={index} item xs={el.gSize}>
              <Chip
                sx={style().chip}
                size="small"
                color="primary"
                label={el.name}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid item container spacing={1} direction="column-reverse" xs={12}>
        {list?.map((el, index) => (
          <SelectedItem key={index} el={el} index={index} />
        ))}
      </Grid>
    </>
  );
};

export default memo(SelectedList);
