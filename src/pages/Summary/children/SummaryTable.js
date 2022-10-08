import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import DataTable from "../../../components/common/DataTable/DataTable";
import { fetchData } from "../../../providers/Redux/Slices/summarySlice";
import columns from "../consts/columns";
import { styles } from "../styles";

const SummaryTable = () => {
  const list = useSelector((state) => state.summary.list);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    fetch(`http://localhost:5000/transactions`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(fetchData(json?.transactions));
      })
      .catch(() => enqueueSnackbar("Veri indirilemedi", { variant: "error" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowClick = (params) => {
    console.log(params.row);
  };

  return (
    <DataTable
      sx={styles.summaryTable}
      rows={list.filter((el) => el.archived === undefined)}
      columns={columns(list, dispatch, enqueueSnackbar, closeSnackbar)}
      loading={!list.length}
      onRowClick={onRowClick}
      getRowClassName={(params) => `MuiDataGrid-row--${params.row.isDeleted}`}
    />
  );
};

export default SummaryTable;
