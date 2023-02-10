import axios from "axios";

export const api = axios.create({
  baseURL: `https://lumpy-order-production.up.railway.app`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
