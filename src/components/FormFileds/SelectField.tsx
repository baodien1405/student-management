import { FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: string | number;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      variant="outlined"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
