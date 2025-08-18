import axios from 'axios';
import { handleError } from 'helpers/error-handlers';

const api = 'https://localhost:7155/api/';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axios.post(api + 'User/login', {
      email,
      password,
    });
    return response;
  } catch (error) {
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
    handleError(error);
  }
};
