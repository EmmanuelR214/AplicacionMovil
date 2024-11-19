import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRoute } from '@/utils/api/apiUser';
import { apiStore } from '@/utils/api/axios';
import { router } from 'expo-router';

interface User {
  id: string;
  rol: string;
  email: string;
  telefono: string;
  carrito: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  errorAuth: string[];
  successAuth: string[];
  countCar: number
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setErrorAuth: React.Dispatch<React.SetStateAction<string[]>>
  setCountCar: React.Dispatch<React.SetStateAction<number>>
  handleAddCarrito: (id: number, precio: number) => Promise<void>;
  signin: (val: { username: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorAuth, setErrorAuth] = useState<string[]>([]);
  const [successAuth, setSuccessAuth] = useState<string[]>([]);
  const [countCar, setCountCar] = useState(0);  
  
  const signin = async (val: { username: string; password: string }) => {
    try {
      const data = { param: val.username, password: val.password}
      const res = await loginRoute(data);
      const token = res.data.token;
      const userData = res.data.user;
      // Configura el token en cookies
      await AsyncStorage.setItem('token', token);
      
      // Actualiza el estado con los datos del usuario y marca como autenticado
      const formattedData = {
        id: userData.id_usuario, 
        rol: userData.roles,
        email: userData.correo,
        telefono: userData.telefono,
        carrito: countCar,
      }
      
      setUser(formattedData);
      setIsAuthenticated(true);
      setSuccessAuth(["¡Hola de nuevo!"]);
      return true
    } catch (error: any) {
      console.log(error)
      const errorMessage = error.response?.data || ["Error desconocido"];
      setErrorAuth(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
      return false
    }
  };
  
  const handleAddCarrito = async(id: number, precio: number) => {
    try {
      console.log(id, user?.id, 1, precio)
      const data = {
        id_platillo: id, 
        id_usuario: user?.id, 
        cantidad: 1, 
        total: precio
      };
      await apiStore.post('/shoppingcar', data)
      const result = await apiStore.get(`/get-shoppingCar/${user?.id}`)
      setCountCar(result.data[0].length)
    } catch (error) {
      console.error(error)
    }
  }
  
  const logout = async() =>{
    try {
      await AsyncStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
      router.push('/HomeScreen')
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    if(errorAuth.length > 0 || successAuth.length > 0){
      const timer = setTimeout(()=>{
        setErrorAuth([])
        setSuccessAuth([])
      },10000)
      return () => clearTimeout(timer)
    }
  },[errorAuth, successAuth])
  
  return(
    <AuthContext.Provider value={{ user, setErrorAuth, isAuthenticated, signin, errorAuth, successAuth, handleAddCarrito, setCountCar, countCar, logout, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};