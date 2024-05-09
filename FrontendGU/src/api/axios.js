import axios from "axios";
import { API_URL } from "../config";
//configuracion de axios
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,//para que pueda establecer las cookies y las podamos ver tambien en el frontend
});

export default instance;
