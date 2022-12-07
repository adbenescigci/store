import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";

import GetAppIcon from "@mui/icons-material/GetApp";

const DownloadIcon = ({ sx, onClick }) => {
  const { goldTypes, transTypes, paymentTypes } = useSelector(
    (state) => state.filter
  );

  const handleClick = () => onClick({ goldTypes, transTypes, paymentTypes });
  return (
    <IconButton sx={sx} onClick={handleClick} color="primary">
      <GetAppIcon />
    </IconButton>
  );
};

export default DownloadIcon;
