import React, { useReducer } from "react";

export const ShopContext = React.createContext();

const ContextProvider = ({ children }) => {
  const shopReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_TRANSACTIONS":
        return {
          transactions: action.data.transactions,
          lastUpdated: action.data.time,
        };
      case "REMOVE_TRANSACTION":
        const transactions = state.transactions.filter(
          (el) => el._id !== action.id
        );
        return { ...state, transactions };
      case "REFRESH":
        const newState = {
          transactions: [...state.transactions, ...action.data.transactions],
          lastUpdated: action.data.time,
        };
        return newState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(shopReducer, {});
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ContextProvider;
