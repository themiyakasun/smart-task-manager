import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: 'Password is too short' }),
});

export const SignupSchema = z.object({
  name: z.string().min(3, { message: 'Name cannot be empty' }),
  email: z.email(),
  password: z.string().min(8, { message: 'Password is too short' }),
});

export const TaskSchema = z.object({
  title: z.string().min(3, { message: 'Title cannot be empty' }),
  description: z.string().min(3, { message: 'Description cannot be empty' }),
  status: z.string(),
});

export const TaskUpdateSchema = z.object({
  id: z.number(),
  title: z.string().min(3, { message: 'Title cannot be empty' }),
  description: z.string().min(3, { message: 'Description cannot be empty' }),
  status: z.string(),
});
