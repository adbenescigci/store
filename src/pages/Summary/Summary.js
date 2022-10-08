import SummaryTable from "./children/SummaryTable";
import BasicCard from "../../components/common/BasicCard/BasicCard";
import BoxWrapper from "../../components/common/BoxWrapper/BoxWrapper";

const Summary = () => {
  return (
    <BoxWrapper>
      <BasicCard content={<SummaryTable />} />
    </BoxWrapper>
  );
};

export default Summary;
