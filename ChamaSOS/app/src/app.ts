// src/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ou o IP da sua máquina se for em dispositivo físico
  timeout: 5000,
});
