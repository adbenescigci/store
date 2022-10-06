import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SummaryTable from "./children/SummaryTable";
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import { useDispatch } from "react-redux";
import { unArchive } from "../../providers/Redux/Slices/summarySlice";

const Summary = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const [second, setSecond] = useState(3);
  const [timeId, setTimeId] = useState("");
  const [intervId, setIntervId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (second === 0) {
      setOpen(false);
      clearTimeout(timeId);
      clearInterval(intervId);
      setTimeId("");
      setIntervId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [second]);

  useEffect(() => {
    const countDown = () => {
      setSecond((second) => second - 1);
    };

    if (timeId) {
      setSecond(3);
      clearInterval(intervId);
      const iId = setInterval(countDown, 1000);
      setIntervId(iId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeId]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleStopDelete = () => {
    clearTimeout(timeId);
    clearInterval(intervId);
    dispatch(unArchive());
    setTimeId("");
    setIntervId("");
    setOpen(false);
    setAlert({
      severity: "info",
      message: "Islem Durduruldu.",
    });
    setOpen(true);
  };

  const handleAlert = (alert) => {
    if (open) setOpen(false);
    setAlert(alert);
    setOpen(true);
  };

  return (
    <BoxWrapper>
      <BasicCard
        content={<SummaryTable setTimeId={setTimeId} onAlert={handleAlert} />}
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
              onClick={handleStopDelete}
            >
              {`Durdur ${second}`}
            </Button>
          )
        }
        message={alert?.message}
      />
    </BoxWrapper>
  );
};

export default Summary;
