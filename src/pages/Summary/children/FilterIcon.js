import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import Badge from '@mui/material/Badge';

const FilterIcon = ({ sx, watch, onClick, color, getValues }) => {
  const [weightFilter, setWeightFilter] = useState(0);
  const { transTypes, paymentTypes } = useSelector((state) => state.filter);

  console.log();
  useEffect(() => {
    const subscription = watch(({ max, min, search }) => {
      setWeightFilter(
        (search.trim() !== '' ? 1 : 0) +
          (Number(max) !== 10000 ? 1 : 0) +
          (Number(min) !== 0 ? 1 : 0)
      );
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);
  const content =
    (transTypes.length !== 2 ? 1 : 0) + (paymentTypes.length !== 2 ? 1 : 0);

  return (
    <IconButton sx={sx} onClick={onClick} color={color}>
      <Badge badgeContent={content + weightFilter} color="primary">
        <TuneIcon />
      </Badge>
    </IconButton>
  );
};

export default FilterIcon;
