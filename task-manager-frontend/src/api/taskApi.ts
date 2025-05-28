import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'done';
}

export const getTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTaskStatus = async (id: string) => {
  await axios.patch(`${API_URL}/${id}`);
};