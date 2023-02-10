import axios from "axios";

export const api = axios.create({
  baseURL: `https://lumpy-order-production.up.railway.app`,
});

export const requestSeller = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestCheckout = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

// export const requestCheckout = async (endpoint, body, token) => {
//   console.log(`http://localhost:${process.env.PORT}/${endpoint}`);
//   const { data } = await axios.post(
//     `http://localhost:3001/${endpoint}`,
//     body,
//     {
//       headers: {
//         Authorization: token,
//       },
//     },
//   );
//   console.log(data);
//   return data;
// };
