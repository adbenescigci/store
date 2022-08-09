import React from "react";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";
import DataTable from "../../components/common/DataTable/DataTable";

const Summary = () => {
  return (
    <BoxWrapper>
      Summary page
      <DataTable sx={{ height: 300, width: "100%" }} />
    </BoxWrapper>
  );
};

export default Summary;
