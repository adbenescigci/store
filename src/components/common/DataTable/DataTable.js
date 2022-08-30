import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({
  sx,
  rows,
  columns,
  loading,
  onRowClick,
  getRowClassName,
}) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <DataGrid
      sx={sx}
      rows={rows}
      columns={columns}
      loading={loading}
      pagination
      pageSize={pageSize}
      getRowClassName={getRowClassName}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 25, 50]}
      onRowClick={onRowClick}
    />
  );
};

export default DataTable;
