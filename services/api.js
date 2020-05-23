import axios from 'axios';

export const api = cep =>
  axios.create({
    baseURL: `https://viacep.com.br/ws/${cep}/json/unicode/`,
    headers: { 'Content-Type': 'application/json' },
  });

export default api;
