import axios from "axios";

export const ApiUser = axios.create({
  baseURL: 'https://api-barbadav1.vercel.app/api',
  withCredentials: true
})