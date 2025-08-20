import axios from 'axios';
import { handleError } from 'helpers/error-handlers';
import toast from 'react-hot-toast';

const api = 'http://localhost:5140/api/';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(api + 'User/login', {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      toast.error('Invalid email or password.');
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
      toast.error('User with this email already exists.');
    }
    handleError(error);
  }
};
