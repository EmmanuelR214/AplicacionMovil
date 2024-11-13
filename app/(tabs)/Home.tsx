import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { FoodCard } from '@/components/Cards';
import { CategorySelector, FoodCarousel } from '@/components/Contents';
import { DrawerComponent } from '@/components/Modal';
import { useAuth } from '@/context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { apiStore } from '@/utils/api/axios';

const foodData = [
  {
    id: 1,
    image: require('../../assets/images/react-logo.png'),
    title: 'Garlic Shrimp Spaghetti',
    description: 'Spicy shrimp with garlic',
    price: '15.00',
    isFavorite: true,
  },
  {
    id: 2,
    image: require('../../assets/images/react-logo.png'),
    title: 'Penne Chicken Carbonara',
    description: 'Creamy pasta with chicken',
    price: '12.00',
    isFavorite: false,
  },
  // Agrega más datos de comida si lo necesitas
];

interface FoodCardProps {
  id_relacion: number;
  nombre_platillo: string;
  estado: string;
  imagen_platillo: string;
  precio: number;
}

const Home = () => {
  const {user, handleAddCarrito, setCountCar} = useAuth()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [platillos, setPlatillos] = useState<FoodCardProps[]>([])
  const [selected, setSelected] = useState(1);
  const insets = useSafeAreaInsets()
  
  useEffect(() => {
    console.log(selected)
    async function featch() {
      const result = await apiStore.get(`/menu-categoria/${selected}`)
      console.log(result.data)
      setPlatillos(result.data[0])
    }
    featch()
  }, [selected])
  
  useEffect(() => {
    async function featch() {
      const result = await apiStore.get(`/get-shoppingCar/${user?.id}`)
      setCountCar(result.data[0].length)
    }
    featch()
  },[])
  
  return (
    <ScrollView style={[tw`flex-1 bg-black px-4`, {paddingTop: insets.top}]}  >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mt-6`}>
        {user ? (<><Text style={tw`text-white text-2xl font-bold`}>Hola, {(user.email.split('@')[0].match(/^[a-zA-Z]+/) || [])[0] || "Usuario"}</Text></>) : (<><Text>Bienvenido</Text></>)}
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={tw`bg-red-400 w-10 h-10 rounded-full items-center justify-center`}>
          <Text style={tw`text-white text-lg`}>{user?.email.charAt(0).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-gray-400 text-lg mt-2`}>Estas listo para ordenar?</Text>
      
      <View style={tw`mt-4 items-center`}>
        <FoodCarousel/>
      </View>
      
      <View style={tw`mt-6`}>
        <Text style={tw`text-white text-xl font-bold`}>Elige la categoria</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <CategorySelector setCategori={setSelected} />
          <Text style={tw`text-yellow-500 text-sm rounded-full px-3 py-1`}>Desliza</Text>
          <AntDesign name="rightcircle" size={18} color="white" />
        </View>
      </View>
      
      <View style={tw`mt-4`}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={[tw`px-4`, {paddingBottom: 160}]} 
        >
          <View style={tw`flex-row flex-wrap -mx-2`}>
            {platillos.map((item, index) => (
              <View key={index} style={tw`w-1/2 px-5 mb-6`}>
                <FoodCard
                  image={item.imagen_platillo}
                  title={item.nombre_platillo}
                  price={item.precio}
                  estado={item.estado}
                  onFavoritePress={() => handleAddCarrito(item.id_relacion, item.precio)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
        <DrawerComponent visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})