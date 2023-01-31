import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const requestSeller = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

// export const requestCheckout = async (endpoint, body) => {
//   const alo = await api.post(endpoint, body);
//   console.log(alo);
//   return alo.data;
// };

export const requestCheckout = async (endpoint, body, token) => {
  console.log(`http://localhost:${process.env.PORT}/${endpoint}`);
  const {data} = await axios.post(`http://localhost:3001/${endpoint}`,
  body,
  {
    headers: {
      'Authorization': token,
    }
  });
  console.log(data);
  return data;
};

// export const setToken = (token) => {
//   api.defaults.headers.common.Authorization = token;
// };
