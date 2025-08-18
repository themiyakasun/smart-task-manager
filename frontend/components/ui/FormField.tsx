import type { FormFieldProps } from 'index';

import { RiEyeFill, RiEyeOffFill } from '@remixicon/react';
import { useState } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';

const FormField = <T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  id,
  control,
  error,
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className='input-field'>
              {type === 'textarea' ? (
                <textarea
                  {...field}
                  name={name}
                  id={name}
                  rows={4}
                  placeholder={placeholder}
                  className={`input-field ${error ? 'border-red-500' : ''}`}
                />
              ) : (
                <input
                  {...field}
                  type={type === 'password' && showPassword ? 'text' : type}
                  placeholder={placeholder}
                  id={name}
                />
              )}
              {type === 'password' && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-text-primary/40'
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </button>
              )}
            </div>

            {error && (
              <p className='text-red-500 text-sm mt-1'>{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormField;
