import { useState } from "react";
import Button from "@mui/material/Button";
import SummaryTable from "./children/SummaryTable";
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import { useDispatch } from "react-redux";
import { remove } from "../../providers/Redux/Slices/summarySlice";
import { deleteTransaction } from "../../api/index";

const Summary = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [timeId, setTimeId] = useState("");

  const dispatch = useDispatch();

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleDelete = async (event, transaction) => {
    setOpen(true);

    setAlert({
      severity: "warning",
      message: "Kalici olarak silinecektir.",
    });

    const id = setTimeout(() => {
      deleteTransaction(transaction.id);
    }, 3.0 * 1000);
    setTimeId(id);
    dispatch(remove(transaction.id));
  };

  return (
    <BoxWrapper>
      <BasicCard
        content={
          <SummaryTable
            handleDelete={handleDelete}
            onAlert={(alert) => {
              setOpen(true);
              setAlert(alert);
            }}
          />
        }
      />
      <BasicSnackbar
        open={open}
        onClose={handleCloseSnackBar}
        severity={alert?.severity}
        action={
          alert?.severity === "warning" && (
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={() => {
                clearTimeout(timeId);

                //dispatch(undo(transaction.id));
              }}
            >
              Islemi Durdur
            </Button>
          )
        }
        message={`${alert?.message}  `}
      />
    </BoxWrapper>
  );
};

export default Summary;
