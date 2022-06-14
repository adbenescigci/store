import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, id, ...other } = props;

  return (
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
      decimalScale={id}
      fixedDecimalScale={id > 0}
    />
  );
});

export default NumberFormatCustom;
