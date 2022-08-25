import React, { useEffect, useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";

const columns = [
  { field: "user", headerName: "Satici", width: 80 },
  { field: "earn", headerName: "Kazanc", width: 80 },
  { field: "description", headerName: "Aciklama", width: 80 },
  { field: "payment", headerName: "Odeme", width: 80 },
  { field: "transactionTime", headerName: "I. Zamani", width: 80 },
  { field: "subTransactions", headerName: "Urunler", width: 80 },
  { field: "isDeleted", headerName: "Kayit", width: 80 },
];
const SummaryTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setItems(json?.transactions);
      });
  }, []);

  return (
    <DataTable
      sx={{ height: "90vh", width: "100%" }}
      rows={items}
      columns={columns}
      loading={!items.length}
    />
  );
};

//?processTime[gt]=${new Date(new Date().setHours(0))}

export default SummaryTable;
