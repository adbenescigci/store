import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const doTransaction = async (newTransaction) => {
  const result = await API.post("transactions", {
    ...newTransaction,
    transactionTime: Date.now(),
  });
  return result;
};
export const updateTransaction = (id, updatedTransaction) =>
  API.patch(`transactions/${id}`, updatedTransaction);
export const deleteTransaction = (id) => API.delete(`transactions/${id}`);

//UPDATE TRANSACTION LISTS
export const refreshTransactions = (referenceTime) =>
  API.get(
    `transactions/refresh?processTime[gt]=${referenceTime}&isDeleted=false`
  );

export const deletedTransactions = (referenceTime) =>
  API.get(`transactions?processTime[gt]=${referenceTime}&isDeleted=true`);

//INIT APP
export const getDailyTransactions = () =>
  API.get(
    `transactions?processTime[gt]=${new Date(
      new Date().setHours(0)
    )}&isDeleted=false`
  );
