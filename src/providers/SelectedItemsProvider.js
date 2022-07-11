import React, { useState, useCallback, useEffect } from "react";

export const ListContext = React.createContext();

const calculateHas = (item) => {
  const has = item.weight
    ? item.amount * item.weight
    : item.amount * (item.setting / 24 + item.workship / 1000);
  return Number(has.toFixed(3));
};

const SelectedItemsProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [sumAlis, setSumAlis] = useState(0);
  const [sumSatis, setSumSatis] = useState(0);

  useEffect(() => {
    let sumAl = 0;
    let sumSat = 0;
    list.forEach((el) => {
      if (el.transactionType === "Aliş") sumAl = sumAl + el.total;
      if (el.transactionType === "Satiş") sumSat = sumSat + el.total;
    });
    setSumAlis(Number(sumAl.toFixed(3)));
    setSumSatis(Number(sumSat.toFixed(3)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

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
      newList[index]["total"] = calculateHas(newList[index]);
      setList(newList);
    },
    [list, setList]
  );

  return (
    <ListContext.Provider
      value={{ list, setList, sumAlis, sumSatis, handleChange, handleDelete }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default SelectedItemsProvider;
