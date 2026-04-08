import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

export const analyzeMarket = async (ticker: string, period: string = '5y') => {
  const response = await api.post('/analyze', { ticker, period });
  return response.data;
};

export const validateModel = async (ticker: string, period: string = '5y') => {
  const response = await api.post('/validate', { ticker, period });
  return response.data;
};

export default api;
