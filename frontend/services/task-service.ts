import axios from 'axios';
import { handleError } from 'helpers/error-handlers';
import type { QueryParams, TaskGetProps } from 'index';
import toast from 'react-hot-toast';

const api = 'http://localhost:5140/api/';

export function isTokenExpired(token: string) {
  if (!token) return true;

  try {
    // JWT is in format: header.payload.signature
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // exp is in seconds, Date.now() is in ms
    const expiryTime = decodedPayload.exp * 1000;
    return Date.now() >= expiryTime;
  } catch (error) {
    console.error('Failed to decode token', error);
    return true; // assume expired if invalid
  }
}

export const createTaskAPI = async (
  title: string,
  description: string,
  status: number
) => {
  const token = localStorage.getItem('token');
  console.log(token);

  if (isTokenExpired(token!)) {
    console.log('Token expired, refresh needed');
  } else {
    console.log('Token still valid');
  }
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).id : undefined;

  try {
    const response = await axios.post(api + 'Task/create', {
      title,
      description,
      status,
      userId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      toast.error('Task with this title already exists for the user.');
    }
    handleError(error);
  }
};

export const updateTaskAPI = async (
  id: string,
  title: string,
  description: string,
  status: number
) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).id : undefined;

  try {
    const response = await axios.put(api + `Task/${id}`, {
      title,
      description,
      status,
      userId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTaskAPI = async (id: number) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(api + `Task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getUsersTasksAPI = async (
  userId: number,
  queryParams?: QueryParams
) => {
  const token = localStorage.getItem('token');
  try {
    const data = await axios.get(api + `Task/usertasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        Search: queryParams?.search,
        Status: queryParams?.status,
        SortBy: queryParams?.sortBy,
        isDescending: queryParams?.isDescending,
        PageNumber: queryParams?.pageNumber || 1,
        PageSize: queryParams?.pageSize || 6,
      },
    });

    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const getTaskByIdAPI = async (id: number) => {
  try {
    const data = await axios.get(api + `Task/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
