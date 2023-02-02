import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestInsertUser = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRemoveUser = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export const requestUsers = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
