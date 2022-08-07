import React, { memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";

const Content = ({ transactions, removeTransaction }) => {
  const getIcons = (el) => {
    const array = el.subTransactions.map((item) => item.transactionType);
    return [...new Set(array)];
  };

  const getSecondaryText = (el) => {
    return el.subTransactions
      .map(
        (item) =>
          ` ${item.amount} ${item.unit} ${item.history?.charAt(0) ?? ""} ${
            item.label
          } ${item.type} ${item.transactionType === "Aliş" ? "Aliş" : ""}`
      )
      .join("\r\n");
  };

  return (
    <Box>
      <List dense={true}>
        {transactions?.length > 0 ? (
          transactions?.map((el, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  onClick={() => removeTransaction(index)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon
                    sx={{
                      "&:hover": {
                        color: "secondary.light",
                      },
                    }}
                  />
                </IconButton>
              }
            >
              <ListItemAvatar sx={{ display: "flex", flexDirection: "column" }}>
                <Avatar>{el.user.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemAvatar sx={{ display: "flex", flexDirection: "column" }}>
                {getIcons(el).map((el, index) =>
                  el === "Satiş" ? (
                    <ChevronLeftIcon key={index} sx={{ color: "green" }} />
                  ) : (
                    <ChevronRightIcon key={index} sx={{ color: "red" }} />
                  )
                )}
              </ListItemAvatar>
              <ListItemText
                sx={{
                  whiteSpace: "pre-line",
                }}
                primary={el.title}
                secondary={getSecondaryText(el)}
              />
            </ListItem>
          ))
        ) : (
          <Typography sx={{ color: "#546e7a" }} align="center">
            {"Herhangi bir islem kaydi bulunmamaktadir."}
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default memo(Content);
