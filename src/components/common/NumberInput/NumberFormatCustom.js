import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, type, ...other } = props;
  return (
    <>
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue,
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
