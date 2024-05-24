import axios from "axios";
import { API_URL } from "../config";
//configuracion de axios
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, //para que pueda establecer las cookies y las podamos ver tambien en el frontend
});
// Interceptor de solicitudes para agregar el token a los encabezados
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
