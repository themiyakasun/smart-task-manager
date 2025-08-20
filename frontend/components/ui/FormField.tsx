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
  options = [],
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div
              className={`input-field ${type === 'select' ? 'w-1/3' : 'w-auto'}`}
            >
              {type === 'textarea' ? (
                <textarea
                  {...field}
                  name={name}
                  id={name}
                  rows={4}
                  placeholder={placeholder}
                  className={`w-full p-0 h-auto outline-none ${error ? 'border-red-500' : ''}`}
                />
              ) : type === 'select' ? (
                <select
                  {...field}
                  id={name}
                  className={`w-full text-black ${error ? 'border-red-500' : ''}`}
                >
                  <option value=''>Select {placeholder}</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
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
