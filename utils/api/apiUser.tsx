import { apiUser } from "./axios";

export const loginRoute = (user: { param: string; password: string }) => apiUser.post(`/login`, user);