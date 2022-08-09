import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const BasicRecordItem = ({
  name,
  label,
  placeholder,
  rows,
  variant,
  required = false,
  xs = 12,
  fullWidth = false,
  multiline = false,
  register,
  focused = false,
  error = false,
  helperText,
  registerName,
  requiredData,
  InputProps,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField
        name={name}
        label={label}
        rows={rows}
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        multiline={multiline}
        focused={focused}
        size="small"
        required={required}
        {...register(`${registerName}`, {
          required: requiredData,
        })}
        error={error}
        helperText={helperText}
        InputProps={InputProps}
      />
    </Grid>
  );
};

export default BasicRecordItem;
