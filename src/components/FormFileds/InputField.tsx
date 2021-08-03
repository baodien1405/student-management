import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import { Control } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
