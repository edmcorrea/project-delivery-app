import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestSaleId = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestSaleStatus = async (endpoint) => {
  const { data } = await api.patch(endpoint);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
