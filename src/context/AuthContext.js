import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from 'expo-auth-session/providers/google'
import { auth } from "../utils/firebase/firebase";
import { LoginRoute } from "../api/auth";
import { signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export const AuthContext = createContext()

export const AuthProvider = ({children, natigation}) => {
  const [user, setUser] = useState(null)
  const [isAutenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorAuth, setErrorAuth] = useState([])
  
  const Login = async (user, pass, nav) =>{
    try {
      const data = {
        param: user,
        password: pass
      }
      const response = 	await LoginRoute(data)
      await AsyncStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      setIsAuthenticated(true)
      nav.navigate('Home')
      console.log(response.data)
    } catch (error) {
      setErrorAuth(error.response.data)
      console.log('error ',error.response.data)
    }
  }
  
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '942890329531-o6v7creo5pg7im3q10ur5gpk4m5hcuht.apps.googleusercontent.com',
  })
  
  useEffect(()=>{
    if(response?.type === 'success'){
      const {id_token} = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
        .then((userCrential) => {
          natigation.navigate('Home')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [response])
  
  
  return(
    <AuthContext.Provider
    value={{
      user,
      errorAuth,
      promptAsync,
      Login
    }}
    >
      {children}
    </AuthContext.Provider>
  )
  
}