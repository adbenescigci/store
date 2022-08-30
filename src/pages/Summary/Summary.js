import { useState } from "react";
import SummaryTable from "./children/SummaryTable";
import BasicSnackbar from "../../components/common/BasicSnackbar/BasicSnackbar";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";

const Summary = () => {
  const [open, setOpen] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <BoxWrapper>
      <BasicCard content={<SummaryTable onError={() => setOpen(true)} />} />
      <BasicSnackbar
        open={open}
        onClose={handleCloseSnackBar}
        severity={"error"}
        message={"Veri indirilemedi"}
      />
    </BoxWrapper>
  );
};

export default Summary;
