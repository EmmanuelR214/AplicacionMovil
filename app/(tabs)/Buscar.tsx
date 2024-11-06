import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputSearch } from '@/components/Inputs';
import tw from 'tailwind-react-native-classnames';

const Buscar = () => {
  const insets = useSafeAreaInsets()
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    console.log('Search Term:', text);
  };
  return (
    <View style={[tw`flex-1 bg-black`, {paddingTop: insets.top}]} >
      <Text style={tw`text-white text-2xl font-bold`} >Buscar</Text>
      <InputSearch change={handleSearchChange} />
    </View>
  )
}

export default Buscar

const styles = StyleSheet.create({})