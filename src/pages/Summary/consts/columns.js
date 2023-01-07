import { intlFormat, getTime, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RestoreIcon from '@mui/icons-material/Restore';
import { updateTransaction, deleteTransaction } from '../../../api/index';
import {
  updateIsDeleted,
  archive,
  unArchive,
} from '../../../providers/Redux/Slices/summarySlice';

const columns = (list, dispatch, enqueueSnackbar, closeSnackbar) => {
  const handleRestore = async (event, transaction) => {
    dispatch(
      updateIsDeleted({
        list,
        transaction: transaction.row,
      })
    );
    const result = await updateTransaction(transaction.id, {
      isDeleted: false,
    });
    enqueueSnackbar(result.message, { variant: result.severity });
  };

  const handleDelete = async (event, transaction) => {
    dispatch(
      archive({
        list,
        transaction: transaction.row,
      })
    );

    const plusMessage = transaction.row.description.slice(0, 6);

    const id = setTimeout(async () => {
      closeSnackbar(snackId);
      const result = await deleteTransaction(transaction.id);
      enqueueSnackbar(` "${plusMessage}" ${result.message}`, {
        variant: result.severity,
      });
    }, 5 * 1000);

    const snackId = enqueueSnackbar(
      `Kalici olarak silinecektir "${plusMessage}"`,
      {
        action: action(id, transaction),
      }
    );
  };
  const action = (id, transaction) => (snackbarId) =>
    (
      <Button
        onClick={() => {
          clearTimeout(id);
          dispatch(
            unArchive({
              list,
              transaction: transaction.row,
            })
          );
          closeSnackbar(snackbarId);
          enqueueSnackbar(
            `Islem Durduruldu "${transaction.row.description.slice(0, 6)}"`,
            { variant: 'info' }
          );
        }}
      >
        Durdur
      </Button>
    );

  return [
    { field: 'user', headerName: 'Satici', minWidth: 80 },
    { field: 'description', headerName: 'Aciklama', minWidth: 115, flex: 0.7 },
    {
      field: 'subTransactions',
      headerName: 'Urunler',
      renderCell: (cellValues) => {
        const length = cellValues.row.subTransactions.length;
        const linkText = `${cellValues.row.subTransactions[0].label} ${
          length > 1 ? `ve ${length - 1} urun` : ''
        } `;

        return (
          <Link
            component="button"
            variant="body2"
            onClick={(event) => {
              event.stopPropagation();
              console.info(cellValues.row.subTransactions);
            }}
          >
            {linkText}
          </Link>
        );
      },
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'cash',
      headerName: 'Nakit',
      width: 90,
      valueGetter: (params) => {
        return params.row.payment.cash;
      },
    },
    {
      field: 'card',
      headerName: 'Kart',
      width: 90,
      valueGetter: (params) => {
        return params.row.payment.card;
      },
    },
    { field: 'earn', headerName: 'Kazanc', width: 70 },
    {
      field: 'transactionTime',
      headerName: 'I. Zamani',
      valueGetter: (params) =>
        intlFormat(
          new Date(params.row.processTime),
          {
            month: 'short',
            year: '2-digit',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
          {
            locale: 'tr-TR',
          }
        ),
      width: 125,
    },
    {
      field: 'isDeleted',
      headerName: 'Kayit',
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
  ];
};

export default columns;
