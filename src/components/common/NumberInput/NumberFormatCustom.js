import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, type, ...other } = props;
  return (
    <>
      <NumberFormat
        {...other}
        format={type === "card" && ""}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: Number(props.name),
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        decimalScale={`${type === "gr" ? 2 : 0}`}
        fixedDecimalScale={type === "gr"}
      />
    </>
  );
});

export default NumberFormatCustom;
