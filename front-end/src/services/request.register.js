import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
