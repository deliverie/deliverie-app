import axios from 'axios';

const api = axios.create({
  baseURL: `http://206.189.219.178/v1`,
  headers: {
    'Accept-Language': 'pt',
  },
});
