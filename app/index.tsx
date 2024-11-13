import React, {useEffect} from "react"
import HomeScreen from "./HomeScreen"
import { useRouter } from "expo-router"
import { useAuth } from "@/context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index () {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  
  useEffect(() => {
    let token
    const getToken = async () => {
      token = await AsyncStorage.getItem('token')
    }
    if (isAuthenticated || token) {
      router.push('/Home');
    }
    getToken()
  }, [isAuthenticated])
  return(
    <HomeScreen/>
  )
}