import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const getTransactions = () => API.get("transactions");
export const doTransaction = (newTransaction) =>
  API.post("transactions", { ...newTransaction, transactionTime: Date.now() });
export const updateTransaction = (id, updatedTransaction) =>
  API.patch(`transactions/${id}`, updatedTransaction);
export const deleteTransaction = (id) => API.delete(`transactions/${id}`);
export const refreshTransactions = (referenceTime) =>
  API.get(`transactions/${referenceTime}`);
