import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import BasicModal from "../../common/BasicModal/BasicModal";
import AddContent from "./children/AddContent";
import SwitchType from "./children/SwitchType";
import { useSelectedList } from "../../../hooks/useSelectedList";

// Validation
const validationSchema = Yup.object().shape({
  description: Yup.string().required("Aciklama giriniz"),
  payment: Yup.string()
    .required("Kontrol ediniz")
    .transform((value) => value.split(",").join("")),
  earn: Yup.string()
    .required("Kontrol ediniz")
    .transform((value) => value.split(",").join("")),
});

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);
  const { list, setList, sumAlis, sumSatis } = useSelectedList();

  // Ref List
  const refPayment = useRef();
  const refEarn = useRef();
  const refDescription = useRef();
  const ref = useRef({ refPayment, refEarn, refDescription });

  //Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: { description: "", payment: "", earn: "" },
    resolver: yupResolver(validationSchema),
  });

  //Functions
  const addNew = async () => {
    const transaction = {
      title: refDescription.current.value || "deneme",
      description: refDescription.current.value,
      payment: parseInt(refPayment.current.value.split(",").join("")),
      aproxProfit: parseInt(refEarn.current.value.split(",").join("")),
      user: "Ahmet",
      subTransactions: list,
      sumAlis,
      sumSatis,
    };
    addNewTransaction(transaction);

    //Clear
    refPayment.current.value = "";
    refEarn.current.value = "";
    refDescription.current.value = "";
    setList([]);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({});
    }
  }, [formState, reset]);

  const onCloseModal = (el, reason) => {
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
          ref={ref}
          type={transactionType}
        />
      }
      onSubmit={handleSubmit(addNew)}
    />
  );
};

export default AddTransactionModal;
