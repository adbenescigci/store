import { useState, useRef } from "react";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import SwitchType from "./children/SwitchType";
import { useSelectedList } from "../../../hooks/useSelectedList";

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);

  const refPayment = useRef();
  const refEarn = useRef();
  const refDescription = useRef();
  const ref = useRef({ refPayment, refEarn, refDescription });

  const { list, setList } = useSelectedList();

  const onCloseModal = (el, reason) => {
    onClose(el, reason);
    setType(false);
  };

  const handleSubmit = async () => {
    const transaction = {
      title: refDescription?.current?.value ?? "deneme",
      description: refDescription?.current?.value,
      user: "Ahmet",
      subTransactions: list,
      payment: refPayment?.current?.value,
      aproxProfit: refEarn?.current?.value,
    };
    await addNewTransaction(transaction);

    setType(false);
    setList([]);
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
