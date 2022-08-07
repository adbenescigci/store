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
  // payment: Yup.object().shape({
  //   cash: Yup.string()
  //     .required("Kontrol ediniz")
  //     .transform((value) => value.split(",").join("")),
  //   card: Yup.string()
  //     .required("Kontrol ediniz")
  //     .transform((value) => value.split(",").join("")),
  // }),
  earn: Yup.string()
    .required("Kontrol ediniz")
    .transform((value) => value.split(",").join("")),
  payment: Yup.string()
    .required("Kontrol ediniz")
    .transform((value) => value.split(",").join("")),
});

const AddTransactionModal = ({ open, onClose, addNewTransaction }) => {
  const [transactionType, setType] = useState(false);
  const { list, setList, sumAlis, sumSatis } = useSelectedList();

  // Ref List
  const refCash = useRef();
  const refCard = useRef();
  const refEarn = useRef();
  const refDescription = useRef();
  const refClaim = useRef();
  const ref = useRef({ refCash, refCard, refClaim, refEarn, refDescription });

  //Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      payment: "",
      earn: "",
    },
    resolver: yupResolver(validationSchema),
  });

  //Functions
  const addNew = async () => {
    const cash = parseInt(refCash.current.value?.split(",").join(""));
    const card = parseInt(refCard.current.value?.split(",").join(""));
    const earn = parseInt(refEarn.current.value.split(",").join(""));
    const claim = parseFloat(refClaim.current.value?.split(",").join(""));

    const transaction = {
      title: refDescription.current.value || "deneme",
      description: refDescription.current.value,
      payment: { cash: isNaN(cash) ? 0 : cash, card: isNaN(card) ? 0 : card },
      earn,
      claim: isNaN(claim) ? 0 : claim,
      user: "Ahmet",
      subTransactions: list,
      sumAlis,
      sumSatis,
    };
    addNewTransaction(transaction);

    //Clear
    refCash.current.value = "";
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
          ref={ref}
          type={transactionType}
        />
      }
      onSubmit={handleSubmit(addNew)}
    />
  );
};

export default AddTransactionModal;
