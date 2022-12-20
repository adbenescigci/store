import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import ScaleIcon from '@mui/icons-material/Scale';
import NumberFormatCustom2 from '../../../common/NumberInput/NumberFormatCustom2';
import CommonButton from '../../../common/CommonButton/CommonButton';
import Controller from '../../../common/Controller/Controller';
import { transT, paymentT } from '../../../../utils/filterTypes';
import {
  updateTransTypes,
  updatePaymentTypes,
  setDefault,
} from '../../../../providers/Redux/Slices/filterSlice';

const FilterContent = ({ formData, onSubmit }) => {
  const [resetFlag, setResetFlag] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    errors,
    control,
    getValues,
    watch,
    resetField,
    clearErrors,
  } = formData;

  const [valueFlag, setValueFlag] = useState(
    getValues('search') !== '' ||
      Number(getValues('min')) !== 0 ||
      Number(getValues('max')) !== 10000
  );

  const { transTypes, paymentTypes } = useSelector((state) => state.filter);

  useEffect(() => {
    const subscription = watch(({ max, min, search }) => {
      if (errors?.min?.type === 'max' && Number(max) > Number(min))
        clearErrors('min');
      if (errors?.max?.type === 'min' && Number(max) < Number(min))
        clearErrors('max');

      if (Number(min) !== 0 || Number(max) !== 10000 || search !== '')
        setValueFlag(true);
      else setValueFlag(false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const handleChange = (el) => (event, data) => {
    if (data.length !== 0) {
      if (el === 'transaction') dispatch(updateTransTypes(data));
      if (el === 'payment') dispatch(updatePaymentTypes(data));
    } else enqueueSnackbar('En az 1 tercih ', { variant: 'info' });
    return;
  };

  const handleDefault = () => {
    dispatch(setDefault());
    resetField('max');
    resetField('min');
    resetField('search');
    flushSync(() => {
      setResetFlag(true);
    });
    flushSync(() => {
      setResetFlag(false);
    });
  };

  const handleSubmit = () => onSubmit({ transTypes, paymentTypes });

  const array = [
    {
      value: transTypes,
      data: transT,
      xs: 6,
      ref: 'transaction',
    },
    {
      value: paymentTypes,
      data: paymentT,
      xs: 6,
      ref: 'payment',
    },
  ];
  if (resetFlag) return <> </>;

  return (
    <Grid
      container
      spacing={1}
      sx={{ paddingTop: 5, paddingBottom: 5 }}
      alignItems="center"
      justifyContent="space-between"
    >
      {array.map((el, index) => (
        <Grid
          key={index}
          container
          item
          xs={el.xs}
          alignItems="center"
          spacing={1}
        >
          <Grid item container>
            <ToggleButtonGroup
              fullWidth
              value={el.value}
              onChange={handleChange(el.ref)}
            >
              {el.data.map((el, index) => (
                <ToggleButton key={index} value={el} aria-label={el}>
                  {el}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <TextField
          name="search"
          fullWidth
          label="Ornek; 22 ceyrek eski -Ahmet"
          variant="filled"
          {...register('search')}
        />
      </Grid>
      <Grid container xs={12} item spacing={3}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="space-between"
          alignItems="start"
        >
          <Grid item xs={5} justifyContent="center">
            <Controller
              {...{
                control,
                name: 'min',
                register,
                rules: {
                  required: {
                    value: true,
                    message: 'Kontrol ediniz',
                  },
                  max: {
                    value: getValues('max'),
                    message: 'En fazla değerinden az olmalıdır.',
                  },
                },
                render: (props) => {
                  return (
                    <NumberFormatCustom2
                      label="En az"
                      defaultValue={getValues('min')}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      focused
                      error={errors.min ? true : false}
                      helperText={errors.min ? errors.min.message : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">g</InputAdornment>
                        ),
                      }}
                      {...props}
                    />
                  );
                },
              }}
            />
          </Grid>

          <Grid item xs={2} sx={{ textAlign: 'center', paddingTop: '10px' }}>
            <ScaleIcon />
          </Grid>

          <Grid item xs={5} sx={{ paddingTop: '0px', textAlign: 'right' }}>
            <Controller
              {...{
                control,
                name: 'max',
                register,
                rules: {
                  required: {
                    value: true,
                    message: 'Kontrol ediniz',
                  },
                  min: {
                    value: Number(getValues('min')),
                    message: 'En az degerinden fazla olmalıdır',
                  },
                },
                render: (props) => (
                  <NumberFormatCustom2
                    {...props}
                    label="En fazla"
                    defaultValue={getValues('max')}
                    decimalScale={2}
                    focused
                    fixedDecimalScale={true}
                    error={errors.max ? true : false}
                    helperText={errors.max ? errors.max.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">g</InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {(paymentTypes.length !== 2 || transTypes.length !== 2 || valueFlag) && (
        <CommonButton
          sx={{
            position: 'absolute',
            top: '1%',
            left: '1%',
            zIndex: '9999',
          }}
          onClick={handleDefault}
        >
          <RefreshIcon /> Varsayilan
        </CommonButton>
      )}
      <CommonButton
        sx={{
          position: 'absolute',
          bottom: '3%',
          left: '42%',
          zIndex: '9999',
        }}
        onClick={handleSubmit}
      >
        Onayla
      </CommonButton>
    </Grid>
  );
};

export default FilterContent;
