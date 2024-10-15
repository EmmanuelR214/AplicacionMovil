import { ApiUser } from "./axios"

export const LoginRoute = user => ApiUser.post('/login', user)