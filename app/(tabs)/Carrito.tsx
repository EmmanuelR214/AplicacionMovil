import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { CartItemCard } from '@/components/Cards';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { CheckoutButton } from '@/components/Buttons';
import { apiStore } from '@/utils/api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

interface CartItem {
  id_carrito: number;
  id_relacion: number;
  id_usuario: string;
  nombre_platillo: string;
  imagen_platillo: string;
  descripcion_platillo: string;
  cantidad: number;
  precio_unitario: string;
  subtotal: string;
}

const Carrito = () => {
  const [itemCarrito, setItemCarrito] = useState<CartItem[]>([])
  const [sumaSubtotales, setSumaSubtotales] = useState(0);
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets()
  const {user, setCountCar} = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    async function featch() {
      const result = await apiStore.get(`/get-shoppingCar/${user?.id}`)
      const carritoItems: CartItem[] = result.data[0]; // Asegúrate de que data[0] contenga un array
      setItemCarrito(carritoItems);
      setCountCar(result.data[0].length)
      const total = carritoItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
      setSumaSubtotales(total);
    }
    featch()
  },[itemCarrito])
  
  const handleLess = async (id_carrito: number, cantidad: number, precioUnitario: string) => {
    try {
      const cant = Math.max(1, cantidad - 1);
      const total = cant * parseFloat(precioUnitario);
      const data = {id_carrito: id_carrito, cantidad: cant, subtotal: total}
      await apiStore.put(`/update-shoppingcar`, data)
    } catch (error) {
      console.error("Error al disminuir la cantidad:", error);
    }
  }
  
  const handlePluss = async (id_carrito: number, cantidad: number, precioUnitario: string) => {
    try {
      const cant = cantidad + 1;
      const total = cant * parseFloat(precioUnitario);
      const data = {id_carrito: id_carrito, cantidad: cant, subtotal: total}
      await apiStore.put(`/update-shoppingcar`, data)
    } catch (error) {
      console.error("Error al aumentar la cantidad:", error);
    }
  }
  
  const handleDelete = async (id_carrito: number) => {
    try {
      await apiStore.delete(`/delete-shoppingcar/${id_carrito}`)
      setItemCarrito((prev) => prev.filter((item) => item.id_carrito !== id_carrito))
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
    }
  }
  
  const handlePayment = () => {
    if(itemCarrito.length > 0) {
      router.push('/Payment')
    }
    else {
      setError('El carrito esta vacio')
    }
  }
  
  useEffect(()=>{
    if(error){
      const timer = setTimeout(()=>{
        setError('')
      },5000)
      return () => clearTimeout(timer)
    }
  },[error])
  
  
  return (
    <View style={[tw`flex-1 bg-black`, {paddingTop: insets.top, paddingBottom: insets.bottom} ] }>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`text-white text-lg font-semibold`}>Mi carrito</Text>
        <TouchableOpacity>
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`px-4`}>
        {itemCarrito.map((item) => (
          <CartItemCard
            key={item.id_relacion}
            image={item.imagen_platillo}
            title={item.nombre_platillo}
            price={item.subtotal}
            quantity={item.cantidad}
            onIncrease={() => handlePluss(item.id_carrito, item.cantidad, item.precio_unitario)}
            onDecrease={() => handleLess(item.id_carrito, item.cantidad, item.precio_unitario)}
            onDelete={() => handleDelete(item.id_carrito)}
          />
        ))}

        <Text style={tw`text-gray-400 text-center mt-4`}>
          ¿Listo para ordenar?
        </Text>
      </ScrollView>
      {/* Resumen de costos */}
      <View style={[  tw`bg-gray-900 p-4 rounded-t-3xl px-5 mb-16`]}>
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-400`}>Subtotal</Text>
          <Text style={tw`text-white`}>${sumaSubtotales.toFixed(2)}</Text>
        </View>
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-400`}>Service App</Text>
          <Text style={tw`text-white`}>Gratis</Text>
        </View>
        <View style={tw`border-t border-gray-700 mt-2 my-2`} />
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-white font-semibold text-lg`}>Total</Text>
          <Text style={tw`text-white font-semibold text-lg`}>${sumaSubtotales.toFixed(2)}</Text>
        </View>
        
        {/* Botón de Checkout */}
        <CheckoutButton title={error ? error : 'Finalizar compra'} onPress={handlePayment} />
      </View>
    </View>
  )
}

export default Carrito

const styles = StyleSheet.create({});