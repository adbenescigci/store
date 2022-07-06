import { useState, useRef, useEffect } from "react";
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
    const payment = Number(refPayment.current.value.split(",").join(""));
    const aproxProfit = Number(refEarn.current.value.split(",").join(""));

    const transaction = {
      title: refDescription.current.value || "deneme",
      description: refDescription.current.value,
      user: "Ahmet",
      subTransactions: list,
      payment,
      aproxProfit,
    };
    addNewTransaction(transaction);
  };

  useEffect(() => {
    return () => {
      setType(false);
      setList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <BasicModal
      isSubmitButtonDisabled={list.length === 0}
      open={open}
      onClose={onCloseModal}
      title={<SwitchType type={transactionType} setType={setType} />}
      content={<AddContent ref={ref} type={transactionType} />}
      onSubmit={handleSubmit}
    />
  );
};

export default AddTransactionModal;
