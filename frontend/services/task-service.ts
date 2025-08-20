import axios from 'axios';
import { handleError } from 'helpers/error-handlers';
import type { QueryParams, TaskGetProps } from 'index';
import toast from 'react-hot-toast';

const api = 'http://localhost:5140/api/';

export const createTaskAPI = async (
  title: string,
  description: string,
  status: number,
  userId: number
) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(api + 'Task/create', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      title,
      description,
      status,
      userId,
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
  status: number,
  userId: number
) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(api + `Task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      title,
      description,
      status,
      userId,
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
