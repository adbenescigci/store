import React from "react";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";

const NumberFormatCustom2 = React.forwardRef((props, ref) => {
  const {
    onChange,
    name,
    label,
    format,
    focused,
    required,
    variant,
    error,
    helperText,
    disabled,
    ...other
  } = props;
  return (
    <>
      <NumberFormat
        {...other}
        format={format}
        size="small"
        label={label}
        focused={focused}
        required={required}
        disabled={disabled}
        getInputRef={ref}
        customInput={TextField}
        variant={variant}
        error={error}
        helperText={helperText}
        onValueChange={(values) => {
          onChange({
            target: {
              name: Number(name),
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    </>
  );
});

export default NumberFormatCustom2;
