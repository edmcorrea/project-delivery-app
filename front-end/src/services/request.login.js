import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  console.log(data);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
