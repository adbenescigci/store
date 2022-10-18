import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TuneIcon from "@mui/icons-material/Tune";
import IconButton from "@mui/material/IconButton";
import DataTable from "../../../components/common/DataTable/DataTable";
import { fetchData } from "../../../providers/Redux/Slices/summarySlice";
import columns from "../consts/columns";
import { styles } from "../styles";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import { getFilter } from "../../../utils/handyFunctions";

const SummaryTable = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const list = useSelector((state) => state.summary.list);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    console.log("test");
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchData(json?.transactions));
      })
      .catch(() => enqueueSnackbar("Veri indirilemedi", { variant: "error" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredList = useMemo(() => getFilter(list, keyword), [keyword, list]);

  const handleChange = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    setKeyword(lowercasedValue);
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

  // const handleStartDateChange = (value) => {
  //   setStart(value);
  //   if (value > end) {
  //     setEnd(null);
  //   }
  // };

  // const handleEndDateChange = (value) => {
  //   setEnd(value);
  // };
  return (
    <Grid
      sx={{ padding: ["5px 7px", "10px 20px"] }}
      container
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={10}>
        <SearchBar
          placeholder="Ayar, urun cesidi, satici,..."
          onChange={(event) => handleChange(event.target.value)}
        />
      </Grid>
      <Grid item xs={2} sx={{ textAlign: "right" }}>
        <IconButton sx={styles.iconButton} color="primary">
          <TuneIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          sx={styles.summaryTable}
          rows={filteredList.filter((el) => el.archived === undefined)}
          columns={columns(list, dispatch, enqueueSnackbar, closeSnackbar)}
          loading={!list.length}
          onRowClick={onRowClick}
          getRowClassName={(params) =>
            `MuiDataGrid-row--${params.row.isDeleted}`
          }
        />
      </Grid>
    </Grid>
  );
};

export default SummaryTable;

//modal

// <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Grid item fullwidth="true" xs={5} md={3} justifyContent="center">
//           <DesktopDatePicker
//             label="Start Date"
//             inputFormat="MM/dd/yy"
//             value={start}
//             onChange={handleStartDateChange}
//             renderInput={(params) => <TextField {...params} />}
//             onError={(reason, value) => console.log(reason, value)}
//           />
//         </Grid>
//         <Grid item fullwidth="true" xs={5} md={3} justifyContent="center">
//           <DesktopDatePicker
//             label="End Date"
//             inputFormat="MM/dd/yy"
//             value={end}
//             minDate={start}
//             onChange={handleEndDateChange}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </Grid>
//       </LocalizationProvider>
