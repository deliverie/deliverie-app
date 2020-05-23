import axios from 'axios';

import { BASE_URL } from './index';

export function getCompany(payload) {
  return axios.get(`${BASE_URL}/companies`, {
    params: payload,
  });
}
