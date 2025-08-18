import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ZodSchema, ZodType } from 'zod';
import type z from 'zod';

export interface FormFieldProps<T extends FieldValues> {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  customStyles?: string;
  control: Control<T>;
  error?: FieldError | undefined;
}

interface AuthFormProps<T extends FieldValues> {
  type: 'SIGNIN' | 'SIGNUP';
  schema: ZodType<T>;
  defaultValues: T;
}

export type ButtonProps = {
  variant: 'PRIMARY' | 'SECONDARY';
  text: string;
  type: 'submit' | 'button';
  customStyles?: string;
};

export type CardProps = {};

export type StatusTabProps = {
  type: 'PENDING' | 'PROGRESS' | 'COMPLETED';
};

export type UserData = {
  name: string;
  email: string;
};

export type UserContextType = {
  user: UserData | null;
  token: string | null;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};
