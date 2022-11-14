import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
    control,
    reset,
    formState,
    watch,
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
    setOpen(false);
  };

  const onCloseModal = (e, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

  const handleStartDateChange = (value) => {
    setStart(value);
    if (value > end) {
      setEnd(null);
    }
  };

  const handleEndDateChange = (value) => {
    setEnd(value);
  };

  const handleOpenFilter = () => {
    setOpen(true);
  };

  return (
    <Grid
      sx={{ padding: ["7px", "10px 20px"] }}
      container
      alignItems="center"
      spacing={1}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item fullwidth="true" xs={4.5} md={3} justifyContent="center">
          <Controller
            control={control}
            name="start"
            defaultValue={start}
            rules={{
              required: {
                value: true,
                message: "Bir Tarih Giriniz",
              },
              validate: (value) => !!Date.parse(value) || "Geçersiz Tarih",
            }}
            render={({ field: { onChange, ...restField } }) => (
              <DesktopDatePicker
                label={`'dan ${
                  errors.start ? `/ ${errors.start.message}` : ""
                }`}
                inputFormat="MM/dd/yy"
                maxDate={Date.now()}
                onChange={(event) => {
                  onChange(event);
                  handleStartDateChange(event);
                }}
                renderInput={(params) => (
                  <TextField
                    focused
                    {...params}
                    error={errors.start ? true : false}
                  />
                )}
                {...restField}
              />
            )}
          />
        </Grid>
        <Grid item fullwidth="true" xs={4.5} md={3} justifyContent="center">
          <Controller
            control={control}
            name="end"
            rules={{
              validate: (value) => {
                if (!value) return true;
                return (
                  (!!Date.parse(value) &&
                    Date.parse(value) >= Date.parse(start)) ||
                  "Geçersiz Tarih"
                );
              },
            }}
            render={({ field: { onChange, ...restField } }) => (
              <DesktopDatePicker
                label={`'a ${errors.end ? `/ ${errors.end.message}` : ""}`}
                inputFormat="MM/dd/yy"
                minDate={start}
                maxDate={Date.now()}
                onChange={(event) => {
                  onChange(event);
                  handleEndDateChange(event);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    focused
                    error={errors.end ? true : false}
                  />
                )}
                {...restField}
              />
            )}
          />
        </Grid>
      </LocalizationProvider>
      <Grid item xs={1.5} sx={{ textAlign: "left" }}>
        <IconButton
          sx={styles.iconButton}
          onClick={handleSubmit(handleOpenFilter)}
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
        onSubmit={handleSubmit(getItems)}
        formData={{ register, errors, watch }}
      />
    </Grid>
  );
};

export default SummaryTable;
