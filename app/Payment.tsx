import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomSelect2, MoneyInput} from '@/components/Inputs';
import { CheckoutButton } from '@/components/Buttons';
import { ResumenPago } from '@/components/Cards';

import { useAuth } from '@/context/AuthContext';
import { apiUser, apiStore } from '@/utils/api/axios';
import { useRouter } from 'expo-router';

// Definir el tipo para las direcciones
interface Direccion {
  id_direccion: string;
  direccion: string;
  url_icono?: string;
}

// Definir el tipo de las opciones seleccionables en CustomSelect2
interface Option {
  value: string;
  label: string;
  icono?: string;
}

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

const saveDataToStorage = async (data: any) => {
  try {
    await AsyncStorage.setItem('orderData', JSON.stringify(data));
    console.log("Datos guardados en AsyncStorage");
  } catch (error) {
    console.error("Error al guardar los datos en AsyncStorage", error);
  }
};

const Payment: React.FC = () => {
  const { user, errorAuth, setErrorAuth } = useAuth();
  const insets = useSafeAreaInsets();
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [selectedOptionDireccion, setSelectedOptionDireccion] = useState<Option | null>(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [pago, setPago] = useState(0);
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState<string>('tarjeta');
  const router = useRouter();
  
  useEffect(()=>{
    async function TraerCarrito() {
      const result = await apiStore.get(`/get-shoppingCar/${user?.id}`)
      setCarrito(result.data[0])
      const carritoItems: CartItem[] = result.data[0];
      const total = carritoItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
      setTotal(total);
    }
    TraerCarrito()
  },[])
  
  useEffect(() => {
    async function TraerDireccon() {
      if (shouldFetch) {
        try {
          const result = await apiUser.get(`/direcciones/${user?.id}`);
          setDirecciones(result.data[0]);
          setShouldFetch(false); // Evitar que vuelva a hacer fetch si ya cargó
        } catch (error) {
          console.error("Error al traer direcciones:", error);
        }
      }
    }
    TraerDireccon();
  }, [shouldFetch]);
  
  const handleOpcionSeleccionada = (value: Option) => setSelectedOptionDireccion(value);
  const handlePagoChange = (value: number) => setPago(value);
  const handleMetodoPagoChange = (metodo: string) => setMetodoPago(metodo);
  
  const handleCheckout = async() => {
    try {
      if (metodoPago === 'efectivo') {
        if(!selectedOptionDireccion) return setErrorAuth(['No has seleccionado una dirección'])
        if(pago === 0) return setErrorAuth(['No has ingresado un monto pago'])
        if(pago < total) return setErrorAuth(['El pago es menor al total'])
        const cambio = pago - total;
        const data = {
          id_usuario: user!.id, 
          sumaSubtotales: total, 
          id_direccion: selectedOptionDireccion.value, 
          metodoPago: 1, 
          precio: pago, 
          cambio: cambio, 
          carrito: carrito,
          email: user!.email,
          telefono: user!.telefono
        }
        const result = await apiStore.post('/venta', data)
        if(result.data) return router.push('/PaymentSucces')
      } else {
        if(!selectedOptionDireccion) return setErrorAuth(['No has seleccionado una dirección'])
        const data = {
          id_usuario: user!.id, 
          sumaSubtotales: total, 
          id_direccion: selectedOptionDireccion?.value, 
          metodoPago: 2, 
          precio: total, 
          cambio: 0, 
          carrito: carrito,
          email: user!.email,
          telefono: user!.telefono
        }
        saveDataToStorage(data);
        router.push('/PayTarjet')
      }
    } catch (error) {
      
    }
  };
  
  return (
    <ScrollView style={[tw`flex-1 bg-black px-4`, { paddingBottom: insets.bottom }]}>
      <Text style={tw`text-white text-2xl font-bold mb-4 text-center`}>Finalizar Compra</Text>

      {/* Select de Dirección */}
      <Text style={tw`text-white mb-2`}>Dirección</Text>
      <CustomSelect2
        options={direcciones.map((option) => ({
          value: option.id_direccion,
          label: option.direccion,
          icono: option.url_icono,
        }))}
        placeholder="Ciudad, colonia, calle, descripción, tipo"
        onChange={handleOpcionSeleccionada}
        value={selectedOptionDireccion}
        opt={true}
        icon={true}
        text="Agregar ubicación"
        click={() => console.log("Agregar ubicación")}
      />

      {/* Método de Pago */}
      <Text style={tw`text-white mt-4 mb-2`}>Método de pago</Text>
      <View style={tw`flex-row items-center mb-4`}>
        <TouchableOpacity onPress={() => handleMetodoPagoChange('tarjeta')} style={tw`flex-row items-center mr-4`}>
          <View style={[tw`w-5 h-5 rounded-full mr-2`, metodoPago === 'tarjeta' ? tw`bg-blue-500` : tw`bg-gray-500`]} />
          <Text style={tw`text-white`}>Tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMetodoPagoChange('efectivo')} style={tw`flex-row items-center`}>
          <View style={[tw`w-5 h-5 rounded-full mr-2`, metodoPago === 'efectivo' ? tw`bg-blue-500` : tw`bg-gray-500`]} />
          <Text style={tw`text-white`}>Efectivo</Text>
        </TouchableOpacity>
      </View>
      
      {metodoPago === 'efectivo' && (
        <View style={tw`mb-4`}>
          <MoneyInput value={pago} onChange={handlePagoChange} />
        </View>
      )}
      
      {/* Resumen de Pago */}
      <ResumenPago items={carrito} />
      
      {/* Total a Pagar */}
      <View style={tw`bg-gray-900 p-4 rounded-lg mt-6 mb-4`}>
        <Text style={tw`text-lg text-white`}>Detalles</Text>
        <Text style={tw`text-gray-400 mt-2`}>
          Se te enviará la confirmación de la compra al correo electrónico. Si deseas factura, comunícate con el Restaurante.
        </Text>
        <Text style={tw`text-lg font-bold text-white mt-4`}>
          Total a pagar: <Text style={tw`text-yellow-500`}>${total.toFixed(2)}</Text>
        </Text>
      </View>
      <Text style={tw`text-red-500 text-center mb-4`} >{errorAuth}</Text>
      {/* Botón de Confirmación */}
      <CheckoutButton
        title={metodoPago === 'efectivo' ? 'Confirmar Pedido en Efectivo' : 'Confirmar Pago'}
        onPress={handleCheckout}
      />
    </ScrollView>
  );
};

export default Payment

const styles = StyleSheet.create({})