import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const doTransaction = async (newTransaction) => {
  try {
    await API.post("transactions", {
      ...newTransaction,
      transactionTime: Date.now(),
    });
    return { severity: "success", message: "Basariyla eklendi" };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};
export const updateTransaction = async (id, data) => {
  try {
    await API.patch(`transactions/${id}`, data);
    return {
      severity: "info",
      message: data.isDeleted
        ? "Basariyla silindi"
        : "Basariyla guncellestirildi",
    };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

export const deleteTransaction = async (id, message) => {
  try {
    await API.delete(`transactions/${id}`);
    return {
      severity: "success",
      message: `Basariyla silindi '${message}...'`,
    };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

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
