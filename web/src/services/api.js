import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json', // Adicione o tipo de conteúdo padrão se necessário
    // 'Access-Control-Allow-Origin': '*', // Este cabeçalho deve ser configurado no backend
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Este cabeçalho deve ser configurado no backend
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Este cabeçalho deve ser configurado no backend
  }
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
