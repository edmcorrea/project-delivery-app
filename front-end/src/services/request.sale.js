import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestSales = async (endpoint, body) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
