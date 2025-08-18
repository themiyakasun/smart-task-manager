import type { FieldError, UseFormRegister } from 'react-hook-form';

export type FormFieldProps = {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  customStyles?: string;
  register?: UseFormRegister<T>;
  error?: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ButtonProps = {
  variant: 'PRIMARY' | 'SECONDARY';
};

export type CardProps = {};

export type StatusTabProps = {
  type: 'PENDING' | 'PROGRESS' | 'COMPLETED';
};
