import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PaymentSucces = () => {
  const router = useRouter();
  return (
    <View style={tw`flex-1 bg-black justify-center items-center px-8`}>
      {/* Ícono de check en círculo */}
      <View style={tw`bg-green-500 rounded-full p-4 mb-6`}>
        <FontAwesome name="check" size={50} color="white" />
      </View>

      {/* Mensaje de confirmación */}
      <Text style={tw`text-white text-2xl font-bold text-center mb-2`}>
        ¡Gracias por tu pedido!
      </Text>
      <Text style={tw`text-white text-center mb-8`}>
        Tu pedido ha sido recibido y lo estamos procesando. Pronto recibirás más información.
      </Text>

      {/* Botón de volver al inicio */}
      <TouchableOpacity
        onPress={() => router.push('/Home') }
        style={tw`bg-red-600 rounded-full px-6 py-3`}
      >
        <Text style={tw`text-white text-center font-bold`}>
          Volver al inicio
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PaymentSucces

const styles = StyleSheet.create({})