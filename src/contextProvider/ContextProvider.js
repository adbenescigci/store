import React, { useReducer } from "react";

export const ShopContext = React.createContext();

const initState = {
  transactions: ["test"],
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRANSACTIONS":
      return { transactions: action.data };
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initState);
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ContextProvider;
