import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";
import GetAppIcon from "@mui/icons-material/GetApp";
import DataTable from "../../../components/common/DataTable/DataTable";
import FilterModal from "../../../components/Modals/FilterModal/FilterModal.js";
import columns from "../consts/columns";
import { fetchData } from "../../../providers/Redux/Slices/summarySlice";
import { styles } from "../styles";

const SummaryTable = () => {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const list = useSelector((state) => state.summary.list);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      max: 100000,
      min: 0,
      start: "",
      end: "",
    },
  });

  useEffect(() => {
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchData(json?.transactions));
      })
      .catch(() => enqueueSnackbar("Veri indirilemedi", { variant: "error" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({});
  //   }
  // }, [formState, reset]);

  const getItems = async (data) => {
    console.log(data);
  };

  const onCloseModal = (e, reason) => {
    setOpen(false);
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

  const handleStartDateChange = (value) => {
    setValue("start", value);
    setStart(value);
    if (value > end) {
      setEnd(null);
    }
  };

  const handleEndDateChange = (value) => {
    setValue("end", value);
    setEnd(value);
  };

  return (
    <Grid
      sx={{ padding: ["0 7px", "10px 20px"] }}
      container
      alignItems="center"
      spacing={1}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item fullwidth="true" xs={4.5} md={3} justifyContent="center">
          <DesktopDatePicker
            {...register("start", {
              required: "Tarih giriniz",
            })}
            label="Başlangıç"
            inputFormat="MM/dd/yy"
            maxDate={Date.now()}
            value={start}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            onError={(reason, value) => console.log(reason, value)}
          />
        </Grid>
        <Grid item fullwidth="true" xs={4.5} md={3} justifyContent="center">
          <DesktopDatePicker
            {...register("end")}
            label="Bitiş"
            inputFormat="MM/dd/yy"
            value={end}
            minDate={start}
            maxDate={Date.now()}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </LocalizationProvider>
      <Grid item xs={1.5} sx={{ textAlign: "left" }}>
        <IconButton
          sx={styles.iconButton}
          onClick={() => setOpen(true)}
          color="info"
        >
          <TuneIcon />
        </IconButton>
      </Grid>
      <Grid item xs={1.5} md={4.5} sx={{ textAlign: "right" }}>
        <IconButton
          sx={styles.iconButton}
          onClick={handleSubmit(getItems)}
          color="primary"
        >
          <GetAppIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          sx={styles.summaryTable}
          rows={list.filter((el) => el.archived === undefined)}
          columns={columns(list, dispatch, enqueueSnackbar, closeSnackbar)}
          loading={!list.length}
          onRowClick={onRowClick}
          getRowClassName={(params) =>
            `MuiDataGrid-row--${params.row.isDeleted}`
          }
        />
      </Grid>
      <FilterModal
        open={open}
        onClose={onCloseModal}
        formData={{ register, getValues }}
      />
    </Grid>
  );
};

export default SummaryTable;
