import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const {user} = useContext(AuthContext)
  return (
    <View>
      <Text>Hola {user.correo}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})