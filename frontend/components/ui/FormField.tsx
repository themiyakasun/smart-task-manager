import type { FormFieldProps } from 'index';
import React from 'react';

const FormField = ({
  label,
  type,
  placeholder,
  name,
  id,
  customStyles,
  register,
  error,
  valueAsNumber,
}: FormFieldProps) => {
  return (
    <div className='input-field'>
      <input type='text' placeholder='sample text' />
    </div>
  );
};

export default FormField;
