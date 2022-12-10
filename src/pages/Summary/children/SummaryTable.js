import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { startOfToday } from 'date-fns';
import { useSnackbar } from 'notistack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FilterIcon from './FilterIcon';
import DownloadIcon from './DownloadIcon';
import DataTable from '../../../components/common/DataTable/DataTable';
import FilterModal from '../../../components/Modals/FilterModal/FilterModal.js';
import columns from '../consts/columns';
import { getTransactions } from '../../../api/index';
import { fetchData } from '../../../providers/Redux/Slices/summarySlice';
import { styles } from '../styles';
import { setDefault } from '../../../providers/Redux/Slices/filterSlice';

let render = 1;

const SummaryTable = () => {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const list = useSelector((state) => state.summary.list);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    resetField,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      max: 10000,
      min: 0,
      start: null,
      end: Date.now(),
    },
  });

  useEffect(() => {
    setFlag(true);
    handleGetItems()({ end: startOfToday() });

    return () => dispatch(setDefault());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetItems = (childData) => async (formData) => {
    const { data, variant, message } = await getTransactions({
      ...formData,
      ...childData,
    });

    if (variant !== 'error') dispatch(fetchData(data?.transactions));
    enqueueSnackbar(message, { variant });
    if (childData) setOpen(false);
  };

  const onCloseModal = (e, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const onRowClick = (params) => {
    console.log(params.row);
  };

  const handleOpenFilter = () => {
    setOpen(true);
  };

  return (
    <Grid
      sx={{ padding: ['7px', '10px 20px'] }}
      container
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        render {render++}
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item fullwidth="true" xs={4.5} md={3} justifyContent="center">
          <Controller
            control={control}
            name="start"
            rules={{
              validate: {
                valid: (v) => !v || !!Date.parse(v) || 'Geçersiz Tarih',
                order: (v) => {
                  return (
                    !v || !getValues('end') || getValues('end') > v || 'Geriye Aliniz'
                  );
                },
              },
            }}
            render={({ field: { onChange, ...restField } }) => (
              <DesktopDatePicker
                label={`${
                  errors.start
                    ? errors.start.message
                    : `${getValues('start') === null ? 'Başlangıç' : `'dan`}`
                }`}
                inputFormat="MM/dd/yy"
                maxDate={getValues('end')}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    focused={getValues('start') !== null}
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
              required: {
                value: true,
                message: 'Bir Tarih Giriniz',
              },
              max: {
                value: Date.now(),
                message: 'Geri Aliniz',
              },
              min: {
                value: getValues('start'),
                message: 'Ileri Aliniz',
              },
              validate: {
                valid: (v) => Date.now() > v || !!Date.parse(v) || 'Geçersiz Tarih',
              },
            }}
            render={({ field: { onChange, ...restField } }) => (
              <DesktopDatePicker
                label={`${
                  errors.end
                    ? errors.end.message
                    : `${getValues('start') === null ? 'Günlük Veri' : `'a`}`
                }`}
                inputFormat="MM/dd/yy"
                maxDate={Date.now()}
                minDate={getValues('start')}
                onChange={onChange}
                renderInput={(params) => (
                  <TextField {...params} focused error={errors.end ? true : false} />
                )}
                {...restField}
              />
            )}
          />
        </Grid>
      </LocalizationProvider>
      <Grid item xs={1.5} sx={{ textAlign: 'left' }}>
        <FilterIcon
          getValues={getValues}
          watch={watch}
          sx={styles.iconButton}
          onClick={handleSubmit(handleOpenFilter)}
          color="primary"
        />
      </Grid>
      <Grid item xs={1.5} md={4.5} sx={{ textAlign: 'right' }}>
        <DownloadIcon
          sx={styles.iconButton}
          onClick={(childData) => handleSubmit(handleGetItems(childData))()}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          sx={styles.summaryTable}
          loading={!list.length && !flag}
          rows={list.filter((el) => el.archived === undefined)}
          columns={columns(list, dispatch, enqueueSnackbar, closeSnackbar)}
          onRowClick={onRowClick}
          getRowClassName={(params) => `MuiDataGrid-row--${params.row.isDeleted}`}
        />
      </Grid>
      <FilterModal
        open={open}
        onClose={onCloseModal}
        onSubmit={(childData) => handleSubmit(handleGetItems(childData))()}
        formData={{
          register,
          errors,
          watch,
          control,
          setValue,
          getValues,
          resetField,
          clearErrors,
        }}
      />
    </Grid>
  );
};

export default SummaryTable;
