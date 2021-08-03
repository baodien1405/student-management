import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFileds';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number.')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an interger.')
    .required('Please enter age.')
    .typeError('Please enter a valid number'),
  mark: yup
    .number()
    .min(0, 'Min is 0.')
    .max(10, 'Max is 10.')
    .required('Please enter mark.')
    .typeError('Please enter a valid number'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female.')
    .required('Please enter gender'),
  city: yup.string().required('Please select city.'),
});

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Failed to submit form value: ', error);
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" label="Full Name" control={control} />

        <RadioGroupField
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" label="Age" control={control} type="number" />
        <InputField name="mark" label="Mark" control={control} type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" label="City" control={control} options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress color="primary" size={16} />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
