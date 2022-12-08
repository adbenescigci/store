import axios from "axios";
import { startOfToday, endOfDay, startOfDay } from "date-fns";

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
      `transactions?processTime[gt]=${startOfToday()}&isDeleted=false`
    );
  } catch (error) {
    return { severity: "error", message: error.message };
  }
};

export const getTransactions = async (filterData) => {
  const { end, start, max, min, goldTypes, transTypes, paymentTypes } =
    filterData;

  const maxTime = endOfDay(end);
  const minTime = startOfDay(!start ? end : start);
  const filter = JSON.stringify({
    max,
    min,
    goldTypes,
    transTypes,
    paymentTypes,
  });

  try {
    const { data } = await API.get(
      `transactions?processTime[lt]=${maxTime}&processTime[gt]=${minTime}&filter=${filter}`
    );
    return {
      data,
      variant: "success",
      message: "Başarıyla Indirildi",
    };
  } catch (error) {
    return { variant: "error", message: error.message };
  }
};
