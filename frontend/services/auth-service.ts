import axios from 'axios';
import { handleError } from 'helpers/error-handlers';
import { toast } from 'react-toastify';

const api = 'https://localhost:7155/api/';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(api + 'User/login', {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      toast.warning('Invalid email or password.');
    }

    handleError(error);
  }
};

export const registerAPI = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(api + 'User/register', {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      toast.warning('User with this email already exists.');
    }
    handleError(error);
  }
};
