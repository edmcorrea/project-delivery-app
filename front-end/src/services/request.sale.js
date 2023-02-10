import axios from "axios";

export const api = axios.create({
  baseURL: `https://lumpy-order-production.up.railway.app`,
});

export const requestSales = async (endpoint, body) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
