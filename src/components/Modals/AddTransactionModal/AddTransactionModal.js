import { useState, useRef } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import SwitchType from "./children/SwitchType";

const test = {
  title: "moc",
  description: "Ahmet Dugun",
  user: "Ahmet",
  subTransactions: [
    {
      transactionType: "alis",
      goldType: "bileklik",
      amount: "200",
      workmanship: "50",
      goldSetting: 22,
    },
    {
      transactionType: "alis",
      goldType: "kunye",
      amount: "2500",
      workmanship: "90",
      goldSetting: 14,
    },
  ],
  payment: ["100USD", "2500TL"],
  paymentType: "cash",
};

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);

  const refPayment = useRef();
  const refEarn = useRef();
  const refDescription = useRef();
  const ref = useRef({ refPayment, refEarn, refDescription });

  const onCloseModal = () => {
    onClose();
    setType(false);
  };

  const handleSubmit = () => {
    addNewTransaction(test);
    setType(false);
  };

  return (
    <BasicModal
      open={open}
      onClose={onCloseModal}
      title={<SwitchType type={transactionType} setType={setType} />}
      content={<AddContent ref={ref} type={transactionType} />}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransactionModal;
