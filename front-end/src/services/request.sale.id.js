import axios from "axios";

export const api = axios.create({
  baseURL: `https://lumpy-order-production.up.railway.app`,
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
