import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ sx, rows, columns }) => {
  return <DataGrid sx={sx} rows={rows} columns={columns} />;
};

export default DataTable;
