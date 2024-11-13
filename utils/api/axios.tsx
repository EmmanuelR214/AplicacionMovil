// Axios.ts
import axios from "axios";

// Creamos el cliente de Axios con la base URL
export const apiUser = axios.create({
  baseURL: "https://api-barbadav1.vercel.app/api",
  withCredentials: true,
});

export const apiStore = axios.create({
  baseURL: 'https://api-barbada-saurce.vercel.app/api',
  withCredentials: true
})