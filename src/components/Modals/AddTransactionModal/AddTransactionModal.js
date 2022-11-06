import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import SwitchType from "./children/SwitchType";

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);
  const [list, setList] = useState([]);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    resetField,
    formState,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workship: {},
      amount: {},
      has: {},
      card: "",
      cash: "",
      description: "",
      earn: "",
      claim: "",
    },
  });

  let sumAlis = 0;
  let sumSatis = 0;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  const addNew = async (data) => {
    const { card, cash, description, earn, claim, amount, workship, has } =
      data;

    const newList = [...list];
    newList.forEach((el) => {
      el.amount = Number(amount[el.id].split(",").join(""));
      el.workship = Number(workship[el.id].split(",").join(""));
      el.has = Number(has?.Satis?.[el.id] || has?.Alis?.[el.id]);
      if (el.transactionType === "Satis") sumSatis += el.has;
      else sumAlis += el.has;
    });

    const transaction = {
      title: description,
      description,
      payment: {
        cash: !!cash ? Number(cash.split(",").join("")) : 0,
        card: !!card ? Number(card.split(",").join("")) : 0,
      },
      earn: Number(earn?.split(",").join("")),
      claim: Number(claim?.split(",").join("")),
      user: "Ahmet",
      subTransactions: newList,
      sumAlis,
      sumSatis,
    };

    addNewTransaction(transaction);
    setList([]);
  };

  const onCloseModal = (el, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    onClose(el, reason);
    setType(false);
    reset({});
    setList([]);
  };

  return (
    <BasicModal
      isSubmitButtonDisabled={list.length === 0}
      open={open}
      onClose={onCloseModal}
      title={<SwitchType type={transactionType} setType={setType} />}
      content={
        <AddContent
          type={transactionType}
          list={list}
          setList={setList}
          formData={{
            register,
            unregister,
            errors,
            resetField,
            control,
            watch,
          }}
        />
      }
      onSubmit={handleSubmit(addNew)}
    />
  );
};

export default AddTransactionModal;
