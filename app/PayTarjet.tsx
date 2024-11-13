import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesome } from '@expo/vector-icons';

const PayTarjet = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const insets = useSafeAreaInsets();
  
  const handleNameChange = (text: string) => {
    const formattedText = text.toUpperCase();
    setValue('nombre', formattedText, { shouldValidate: true });
  };
  
  const handleCardNumber = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setValue('numeroTarjeta', formattedValue, { shouldValidate: true });
  };
  
  const getCurrentYearTwoDigits = () => new Date().getFullYear().toString().slice(-2);

  const handleCardDate = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        value = '12' + value.slice(2);
      }
    }
    if (value.length === 4) {
      const year = value.slice(2, 4);
      const currentYear = getCurrentYearTwoDigits();
      if (parseInt(year, 10) < parseInt(currentYear, 10)) {
        value = value.slice(0, 2) + currentYear;
      }
    }
    const formattedValue = value.length > 2 ? value.slice(0, 2) + '/' + value.slice(2) : value;
    setValue('fechaExpiracion', formattedValue, { shouldValidate: true });
  };
  
  const handleCardCVV = (text: string) => {
    let value = text.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setValue('cvv', value, { shouldValidate: true });
  };
  
  const onSubmit = (data: any) => {
    console.log(data)
  };
  
  return (
    <ScrollView style={[tw`flex-1 bg-black px-4`, {paddingBottom: insets.bottom}]}>
      <Text style={tw`text-white text-2xl font-bold mb-4 text-center`}>Pago con tarjeta</Text>
        <Text style={tw`text-gray-400 mb-2`}>Nombre</Text>
        <Controller
          control={control}
          name="nombre"
          rules={{ pattern: { value: /^[A-Za-z\s]+$/i, message: 'El nombre no puede contener números ni caracteres especiales' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`text-white bg-gray-800 p-3 rounded-md mb-2`}
              placeholder="Como aparece en la tarjeta"
              placeholderTextColor="gray"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                handleNameChange(text);
                onChange(text);
              }}
            />
          )}
        />
        {errors.nombre?.message && <Text style={tw`text-red-500`}>{String(errors.nombre.message)}</Text>}
        <Text style={tw`text-gray-400 mb-2`}>Número de tarjeta</Text>
        <Controller
          control={control}
          name="numeroTarjeta"
          rules={{ required: 'Número de tarjeta es requerido' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`text-white bg-gray-800 p-3 rounded-md mb-2`}
              placeholder="XXXX XXXX XXXX XXXX"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                handleCardNumber(text);
                onChange(text);
              }}
            />
          )}
        />

        <Text style={tw`text-gray-400 mb-2`}>Fecha de expiración</Text>
        <Controller
          control={control}
          name="fechaExpiracion"
          rules={{ required: 'Fecha de expiración es requerida' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`text-white bg-gray-800 p-3 rounded-md mb-2`}
              placeholder="MM/AA"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                handleCardDate(text);
                onChange(text);
              }}
            />
          )}
        />

        <Text style={tw`text-gray-400 mb-2`}>CVV</Text>
        <Controller
          control={control}
          name="cvv"
          rules={{ required: 'CVV es requerido', minLength: 3, maxLength: 3 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`text-white bg-gray-800 p-3 rounded-md mb-2`}
              placeholder="123"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                handleCardCVV(text);
                onChange(text);
              }}
            />
          )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={tw`bg-blue-500 p-3 rounded-md mt-4`}>
          <Text style={tw`text-center text-white font-bold`}>Realizar Pago</Text>
        </TouchableOpacity>
        <View style={tw`flex-row justify-around mb-4 mt-4`}>
          <Image source={require('../assets/images/tarjets-de-credito.png')} style={tw`h-16 w-32`} />
          <Image source={require('../assets/images/Openpay_tarjetas-de-debito.png')} style={tw`h-16 w-24`} />
        </View>
        <View style={tw`flex-row items-center justify-between mt-6 border-t border-gray-700 pt-4`}>
          <View style={tw`flex-1 items-center`}>
            <Text style={tw`text-xs text-gray-400 mb-1`}>Transacciones realizadas vía:</Text>
            <Image source={require('../assets/images/LogotipoOpenpay-01.png')} style={tw`h-5 w-12 `} />
          </View>
          <View style={tw`flex-1 flex-row items-center justify-center`}>
            <Image source={require('../assets/images/secure.png')} style={tw`h-6 w-5 mr-2`} />
            <Text style={tw`text-xs text-gray-400`}>Tus pagos se realizarán de forma segura con encriptación de 256 bits</Text>
          </View>
        </View>
    </ScrollView>
  )
}

export default PayTarjet

const styles = StyleSheet.create({})