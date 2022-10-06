import React, { useEffect } from "react";
import { intlFormat, getTime, parseISO } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import RestoreIcon from "@mui/icons-material/Restore";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  updateIsDeleted,
  archive,
} from "../../../providers/Redux/Slices/summarySlice";
import DataTable from "../../../components/common/DataTable/DataTable";
import { updateTransaction, deleteTransaction } from "../../../api/index";
import { styles } from "../styles";

const SummaryTable = ({ onAlert, setTimeId }) => {
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

  const handleRestore = async (event, transaction) => {
    dispatch(
      updateIsDeleted({
        list,
        transaction: transaction.row,
      })
    );
    await updateTransaction(transaction.id, { isDeleted: false });
    onAlert({
      severity: "info",
      message: " Basariyla geri donduruldu",
    });
  };

  const handleDelete = async (event, transaction) => {
    dispatch(
      archive({
        list,
        transaction: transaction.row,
      })
    );
    onAlert({
      severity: "warning",
      message: `Kalici olarak silinecektir`,
    });
    const id = setTimeout(async () => {
      const result = await deleteTransaction(
        transaction.id,
        transaction.row.description.slice(0, 6)
      );
      console.log(transaction.row.description.slice(0, 6));
      onAlert(result);
    }, 3 * 1000);

    setTimeId(id);
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

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

  return (
    <DataTable
      sx={styles.summaryTable}
      rows={list.filter((el) => el.archived === undefined)}
      columns={columns}
      loading={!list.length}
      onRowClick={onRowClick}
      getRowClassName={(params) => `MuiDataGrid-row--${params.row.isDeleted}`}
    />
  );
};

export default SummaryTable;
