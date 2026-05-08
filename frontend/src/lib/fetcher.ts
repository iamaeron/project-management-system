import axios from "axios";

export const getData = (endpoint: string, config: any = {}) =>
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api${endpoint}`, {
    withCredentials: true,
    ...config,
  });

export const postData = (endpoint: string, data: any = {}, config: any = {}) =>
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api${endpoint}`, data, {
    withCredentials: true,
    ...config,
  });

export const deleteData = (endpoint: string, config: any = {}) =>
  axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api${endpoint}`, {
    withCredentials: true,
    ...config,
  });

export const putData = (endpoint: string, data: any, config: any = {}) =>
  axios.put(`${import.meta.env.VITE_BACKEND_URL}/api${endpoint}`, data, {
    withCredentials: true,
    ...config,
  });
