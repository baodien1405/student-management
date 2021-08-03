import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: string | number;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      size="small"
      disabled={disabled}
      error={invalid}
      margin="normal"
      component="fieldset"
    >
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
