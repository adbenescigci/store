import React, { useEffect, useState } from "react";
import DataTable from "../../../components/common/DataTable/DataTable";
import { intlFormat } from "date-fns";

const columns = [
  { field: "user", headerName: "Satici", width: 80 },
  { field: "description", headerName: "Aciklama", width: 80 },
  {
    field: "cash",
    headerName: "Nakit",
    width: 80,
    valueGetter: (params) => {
      return params.row.payment.cash;
    },
  },
  {
    field: "card",
    headerName: "Kart",
    width: 80,
    valueGetter: (params) => {
      return params.row.payment.card;
    },
  },
  { field: "earn", headerName: "Kazanc", width: 80 },
  {
    field: "transactionTime",
    headerName: "I. Zamani",
    valueGetter: (params) =>
      intlFormat(
        new Date(params.row.processTime),
        {
          weekday: "narrow",
          month: "short",
          year: "2-digit",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        },
        {
          locale: "tr-TR",
        }
      ),
    width: 135,
  },
  { field: "subTransactions", headerName: "Urunler", width: 80 },
];

// play with css time
const summaryTableStyles = {
  height: ["75vh", "80vh"],
  width: "100%",
  "& .MuiDataGrid-row--true": {
    backgroundColor: "red",
  },
  "& .MuiDataGrid-row--true: hover": {
    backgroundColor: "yellow",
  },
};

const SummaryTable = ({ onError }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setItems(json?.transactions);
      })
      .catch(() => onError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowClick = (params) => {
    console.log(params.row);
  };
  return (
    <DataTable
      sx={summaryTableStyles}
      rows={items}
      columns={columns}
      loading={!items.length}
      onRowClick={onRowClick}
      getRowClassName={(params) => `MuiDataGrid-row--${params.row.isDeleted}`}
    />
  );
};

//?processTime[gt]=${new Date(new Date().setHours(0))}

export default SummaryTable;
