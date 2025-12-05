import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.187:3000/api', 
  timeout: 5000,
});
