import { StyleSheet, Text, View, Alert } from 'react-native'
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ButtonCount, ButtonGoToCart } from '@/components/Buttons';
import tw from 'tailwind-react-native-classnames';

const DescripcionPlatillo = () => {
  const [count, setCount] = useState(1);
  const handleGoToCart = () => {
    Alert.alert("Go To Cart", "Navegando al carrito...");
  };
  return (
    <View style={[tw`flex-1 bg-black`,]} >
      <ButtonCount count={count} setCount={setCount} />
      <ButtonGoToCart onPress={handleGoToCart} />
    </View>
  )
}

export default DescripcionPlatillo

const styles = StyleSheet.create({})