import BasicModal from "../../common/BasicModal/BasicModal";
import FilterContent from "./children/FilterContent";

const FilterModal = ({ open, onClose, formData, onSubmit }) => {
  return (
    <BasicModal
      type="filter"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      content={<FilterContent formData={formData} onClose={onClose} />}
    />
  );
};

export default FilterModal;
