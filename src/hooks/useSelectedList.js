import React from "react";
import { ListContext } from "../providers/SelectedItemsProvider";

export const useSelectedList = () => {
  return React.useContext(ListContext);
};
