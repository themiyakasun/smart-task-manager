import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { ZodSchema, ZodType } from 'zod';
import type z from 'zod';

interface Option {
  label: string | number;
  value: string | number;
}

export interface FormFieldProps<T extends FieldValues> {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  customStyles?: string;
  control: Control<T>;
  error?: FieldError | undefined;
  options?: Option[];
}

interface AuthFormProps<T extends FieldValues> {
  type: 'SIGNIN' | 'SIGNUP';
  schema: ZodType<T>;
  defaultValues: T;
}

interface TaskFormProps<T extends FieldValues> {
  type: 'CREATE' | 'UPDATE';
  schema: ZodType<T>;
  defaultValues: T;
}

export type ButtonProps = {
  variant: 'PRIMARY' | 'SECONDARY';
  text: string;
  type: 'submit' | 'button';
  customStyles?: string;
  onClick?: () => void;
};

export type CardProps = {
  id: number;
  status: number;
  title: string;
  description: string;
  createdAt: Date;
  setShowTaskDetails: (value: boolean) => void;
  setActiveTask: (value: number) => void;
};

export type StatusTabProps = {
  type: 'PENDING' | 'PROGRESS' | 'COMPLETED';
};

export type UserData = {
  id: number;
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

export type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export type TaskGetProps = {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: Date;
  userId: number;
  userDetails: null;
};

interface QueryParams {
  search?: string;
  status?: string;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
