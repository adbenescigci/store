import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ sx, rows, columns, loading }) => {
  return <DataGrid sx={sx} rows={rows} columns={columns} loading={loading} />;
};

export default DataTable;
