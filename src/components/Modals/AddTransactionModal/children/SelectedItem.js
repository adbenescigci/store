import { memo, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Controller from '../../../common/Controller/Controller';
import NumberFormatCustom2 from '../../../common/NumberInput/NumberFormatCustom2';

const style = (el, type) => ({
  chip: {
    width: '100%',
    justifyContent: 'space-between',
    borderRadius: '16px',
    borderColor: '#b28900',
    color: '#424242',
  },
  chipTotal: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 1,
    borderColor: '#b28900',
    color: '#424242',
  },
  chipType: {
    width: ['90', '70%'],
    justifyContent: 'center',
    borderRadius: 1,
    bgcolor: el.transactionType === 'Alis' && '#b28900',
    color: el.transactionType !== 'Alis' ? '#424242' : 'white',
  },
  avatar: {
    bgcolor: '#b28900 !important',
    color: 'white !important',
    display: `${!el?.history ? 'none' : ''}`,
  },
  textField: {
    textAlign: 'center',
    padding: '2px',
    fontWeight: `${type === 'has' ? 700 : 400}`,
    WebkitTextFillColor: '#424242',
    fontSize: '3px ! important',
    borderRadius: 3,
  },
});

const calculateHas = (amount, workship, el) => {
  const has = el.weight
    ? amount * el.has * (1 + workship / 1000)
    : amount * (el.setting / 24 + workship / 1000);
  return Number(has.toFixed(3));
};

const SelectedItem = ({ el, handleDelete, formData }) => {
  const [has, setHas] = useState(el.has);
  const { register, control, watch, errors } = formData;

  useEffect(() => {
    const subscription = watch((data) => {
      if (!!data.amount) {
        const hasNew = calculateHas(
          data?.amount?.[el.id],
          data?.workship?.[el.id],
          el
        );
        setHas(hasNew);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, el]);

  return (
    <Grid container item spacing={1} alignItems="center">
      <Grid item align="center" xs={1.6}>
        <Chip sx={style(el).chipType} size="small" label={el.transactionType} />
      </Grid>
      <Grid item xs={3.8}>
        <Chip
          sx={style(el).chip}
          size="small"
          label={` ${el.type === 'Saat' ? 'Saat' : el.type.substring(0, 3)} ${
            el.label
          }  `}
          onDelete={handleDelete(el.id, el.transactionType)}
          avatar={
            <Avatar sx={style(el).avatar}>{el.history?.charAt(0)}</Avatar>
          }
        />
      </Grid>
      <Grid item xs={2.2}>
        <Controller
          {...{
            control,
            name: `amount.${el.id}`,
            register,
            rules: {
              required: true,
            },
            render: (props) => (
              <NumberFormatCustom2
                {...props}
                required={true}
                defaultValue={el.amount || ''}
                decimalScale={2}
                fixedDecimalScale={el.weight ? false : true}
                error={!!errors?.amount?.[el.id] ? true : false}
                InputProps={{
                  inputProps: {
                    style: style(el).textField,
                  },
                  type: el.unit,
                }}
                variant="filled"
                size="small"
              />
            ),
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          {...{
            control,
            name: `workship.${el.id}`,
            register,
            rules: {
              required: true,
            },
            render: (props) => (
              <NumberFormatCustom2
                {...props}
                required={true}
                defaultValue={el.workship || 0}
                error={!!errors?.workship?.[el.id] ? true : false}
                InputProps={{
                  inputProps: {
                    style: style(el).textField,
                  },
                }}
                variant="filled"
                size="small"
              />
            ),
          }}
        />
      </Grid>
      <Grid item xs={2.4}>
        <Controller
          {...{
            control,
            name: `has.${el.transactionType}.${el.id}`,
            register,
            rules: {
              value: el?.has,
            },
            render: (props) => (
              <NumberFormatCustom2
                {...props}
                disabled
                value={has}
                error={false}
                decimalScale={3}
                InputProps={{
                  inputProps: {
                    style: style(el, 'has').textField,
                  },
                  type: el?.unit,
                }}
                variant="outlined"
                size="small"
              />
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default memo(SelectedItem);
