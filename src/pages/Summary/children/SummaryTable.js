import React, { useEffect } from "react";
import { intlFormat, getTime, parseISO } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import RestoreIcon from "@mui/icons-material/Restore";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  remove,
} from "../../../providers/Redux/Slices/summarySlice";
import DataTable from "../../../components/common/DataTable/DataTable";
import { updateTransaction } from "../../../api/index";
import { styles } from "../styles";

const SummaryTable = ({ onAlert, handleDelete }) => {
  const list = useSelector((state) => state.summary.list);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchData(json?.transactions));
      })
      .catch(() =>
        onAlert({
          severity: "error",
          message: "Veri indirilemedi",
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      field: "isDeleted",
      headerName: "Kayit",
      renderCell: (cellValues) => {
        return (
          <>
            {getTime(parseISO(cellValues.row.transactionTime)) <
              new Date().setHours(0) && (
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(event, cellValues);
                }}
              >
                <DeleteIcon />
              </Button>
            )}

            {cellValues.row.isDeleted && (
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  handleRestore(event, cellValues);
                }}
              >
                <RestoreIcon />
              </Button>
            )}
          </>
        );
      },
      width: 70,
    },
    { field: "user", headerName: "Satici", width: 80 },
    { field: "description", headerName: "Aciklama", width: 115 },
    {
      field: "cash",
      headerName: "Nakit",
      width: 75,
      valueGetter: (params) => {
        return params.row.payment.cash;
      },
    },
    {
      field: "card",
      headerName: "Kart",
      width: 75,
      valueGetter: (params) => {
        return params.row.payment.card;
      },
    },
    { field: "earn", headerName: "Kazanc", width: 70 },
    {
      field: "transactionTime",
      headerName: "I. Zamani",
      valueGetter: (params) =>
        intlFormat(
          new Date(params.row.processTime),
          {
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
      width: 125,
    },
    { field: "subTransactions", headerName: "Urunler", width: 80 },
  ];

  const handleRestore = async (event, transaction) => {
    dispatch(remove(transaction.id));
    await updateTransaction(transaction.id, { isDeleted: false });
    onAlert({
      severity: "info",
      message: " Basariyla geri donduruldu",
    });
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

  return (
    <DataTable
      sx={styles.summaryTable}
      rows={list}
      columns={columns}
      loading={!list.length}
      onRowClick={onRowClick}
      getRowClassName={(params) => `MuiDataGrid-row--${params.row.isDeleted}`}
    />
  );
};

export default SummaryTable;
