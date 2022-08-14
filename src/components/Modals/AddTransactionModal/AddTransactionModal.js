import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import SwitchType from "./children/SwitchType";
import { useSelectedList } from "../../../hooks/useSelectedList";

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);
  const { list, setList, sumAlis, sumSatis } = useSelectedList();

  //Form Validation
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      card: "",
      cash: "",
      description: "",
      earn: "",
      claim: "",
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  const addNew = async (data) => {
    const { card, cash, description, earn, claim } = data;

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
      subTransactions: list,
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
          register={register}
          errors={errors}
          resetField={resetField}
          type={transactionType}
          control={control}
        />
      }
      onSubmit={handleSubmit(addNew)}
    />
  );
};

export default AddTransactionModal;
