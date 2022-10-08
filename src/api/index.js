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
      severity: "success",
      message: data.isDeleted
        ? "Basariyla silindi"
        : "Basariyla geri donduruldu",
    };
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

export const deleteTransaction = async (id) => {
  try {
    await API.delete(`transactions/${id}`);
    return {
      severity: "success",
      message: `Basariyla silindi`,
    };
  } catch (error) {
    return { severity: "error", message: "Silinemedi" };
  }
};

//UPDATE TRANSACTION LISTS
export const refreshTransactions = async (referenceTime) => {
  try {
    return await API.get(
      `transactions/refresh?processTime[gt]=${referenceTime}&isDeleted=false`
    );
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

export const deletedTransactions = (referenceTime) =>
  API.get(`transactions?processTime[gt]=${referenceTime}&isDeleted=true`);

//INIT APP
export const getDailyTransactions = async () => {
  try {
    return await API.get(
      `transactions?processTime[gt]=${new Date(
        new Date().setHours(0)
      )}&isDeleted=false`
    );
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};
