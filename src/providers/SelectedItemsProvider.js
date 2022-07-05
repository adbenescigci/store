import React, { useState, useCallback } from "react";

export const ListContext = React.createContext();

const SelectedItemsProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const handleDelete = useCallback(
    (id) => () => {
      const newList = list?.filter((el) => el.id !== id);
      setList(newList);
    },
    [list, setList]
  );

  const handleChange = useCallback(
    (type, index) => (event) => {
      const { value } = event.target;
      let newList = [...list];
      newList[index][type] = Number(value);
      setList(newList);
    },
    [list, setList]
  );

  return (
    <ListContext.Provider value={{ list, setList, handleChange, handleDelete }}>
      {children}
    </ListContext.Provider>
  );
};

export default SelectedItemsProvider;
