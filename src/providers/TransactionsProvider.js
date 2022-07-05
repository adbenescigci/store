import React, { useReducer } from "react";

export const ShopContext = React.createContext();

const TransactionsProvider = ({ children }) => {
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
        const removedState = {
          transactions,
          lastUpdated: Date.now() + 1000,
        };
        return removedState;
      case "ADD_TRANSACTION":
        const updatedState = {
          transactions: [action.newTransaction, ...state.transactions],
          lastUpdated: Date.now() + 1000,
        };
        return updatedState;
      case "REFRESH":
        let rTransactions = [...state.transactions];

        if (action.data.deletedItemsIds.length > 0) {
          action.data.deletedItemsIds.forEach((itemId) => {
            rTransactions = rTransactions.filter((el) => itemId !== el._id);
          });
        }

        const newState = {
          transactions: [...action.data.transactions, ...rTransactions],
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

export default TransactionsProvider;
