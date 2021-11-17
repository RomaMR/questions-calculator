import React, { useCallback, ChangeEvent } from 'react';
import { FormikProps } from 'formik';
import { TextField } from '@material-ui/core';

interface InputsProps {
  form: FormikProps<any>;
  name: string;
  label?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}

function Input({ form, name, label, type = 'text', className, disabled }: InputsProps) {

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(name, event.target.value)
  }, [form, name]);

  return (
    <TextField
      className={className}
      label={label}
      type={type}
      onChange={onChange}
      value={form.values[name]}
      disabled={disabled}
    />
  );
}

export default Input;
