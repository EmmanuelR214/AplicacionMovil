import { StyleSheet, Text, View, Alert, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ButtonCount, ButtonGoToCart, ButtonDetalle } from '@/components/Buttons'
import { CustomSelectPlus } from '@/components/Inputs';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiStore } from '@/utils/api/axios';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface Platillo {
  descripcion_platillo: string;
  id_platillo: number;
  imagen_platillo: string;
  nombre_platillo: string;
  precio: string;
  presentaciones: string; // Cadena separada por comas (ejemplo: "Unica, Doble")
  tamaños: string; // Cadena separada por comas (ejemplo: "Individual, Familiar")
}

interface Recomendacion {
  id_platillo_recomendado: number;
  id_recomendacion: number;
  platillo_principal: string;
  platillo_recomendado: string;
  precio_platillo_recomendado: string;
  tamaño_platillo_recomendado: string;
  tipo: "acompañamiento" | "guarnicion"; // Solo puede ser "acompañamiento" o "guarnicion"
}

interface PlatilloPrecio {
  precio: number;
  id_platillo: number;
  id_relacion: number;
  presentacion: string;
  tamaño: string;
}

interface Option {
  value: string;
  label: string;
}

interface Option2 {
  value: string;
  label: string;
  extraText: string;
  precio: number;
}

type ApiResponse = [Platillo, Recomendacion[]];

const DescripcionPlatillo = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [opcionTam, setOpcionTam] = useState<Option | null>(null);
  
  const [opcionPresent, setOpcionPresent] = useState<Option | null>(null);
  
  const [selectAcomp, setSelectAcomp] = useState<Option2[]>([]);
  const [precioExtraAcompañamiento, setPrecioExtraAcompañamiento] = useState(0)
  
  const [precioExtraGuarnicion, setPrecioExtraGuarnicion] = useState(0)
  const [selectedOptionExtra, setSelectedOptionExtra] = useState<Option2[]>([])
  
  const [precioBd, setPrecioBd] = useState<number | null>(null);
  const [IDPlato, setIDPlato] = useState<number | null>(null);  
  
  const [tamaños, setTamaños] = useState<string[]>([]);
  const [presentaciones, setPresentaciones] = useState<string[]>([]);
  const [guarniciones, setGuarniciones] = useState<Recomendacion[]>([]);
  const [acompañamientos, setAcompañamientos] = useState<Recomendacion[]>([]);
  
  const precioSubtotal = precioBd!  * count;
  const precioTotal = (precioSubtotal + precioExtraGuarnicion + precioExtraAcompañamiento).toFixed(2)
  
  
  useEffect(() => {
    const fetchPlatilloData = async () => {
      try {
        const platillo = await AsyncStorage.getItem('platillo'); 
        if (!platillo) {
          throw new Error('No se encontró el ID del platillo');
        }
        const response = await apiStore.get(`/descripcion-platillo/${platillo}`);
        const responseData = response.data;
        if (!responseData) {
          throw new Error('Error al cargar los detalles del platillo');
        }
        setData(responseData);
      } catch (error) {
        console.error(error);
        router.push('/HomeScreen');
      } finally {
        setIsLoading(false); 
      }
    }
    fetchPlatilloData();
  }, []);
  
  useEffect(()=>{
  async function fetchData() {
    try {
      const id = data![0].id_platillo
      const tam = opcionTam!.value
      const pre = opcionPresent!.value
      setTamaños(data![0].tamaños.split(','))
      setPresentaciones(data![0].presentaciones.split(','))
      setGuarniciones(data![1].filter(item => item.tipo === 'guarnicion'))
      setAcompañamientos(data![1].filter(item => item.tipo === 'acompañamiento'))
      
      if(tam !== undefined || pre !== undefined){
        let p = await apiStore.get(`/precio-platillo`, { params: { id, tam, pre } })
        p = p.data[0]
        const precio = p.precio;
        const id2 = p.id_relacion;
        setPrecioBd(precio)
        setIDPlato(id2)
        setOpcionTam({value: p.tamaño, label: p.tamaño});
        setOpcionPresent({value: p.presentacion, label: p.presentacion});
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }
  fetchData();
  },[data, opcionTam?.value, opcionPresent?.value])
  
  useEffect(() => {
    if (data && data.length > 0 && opcionPresent === null && opcionTam === null) {
      obtenerDetalle()
    }
  }, [data, opcionPresent, opcionTam])
  
  const obtenerDetalle = async () => {
    try {
      const id = data![0].id_platillo
      const pre = data![0].precio
      let p = await apiStore.get('/detalle-precio', {params: {id, pre}})
      p = p.data[0]
      setOpcionPresent({ value: p.presentacion, label: p.presentacion });
      setOpcionTam({value: p.tamaño, label: p.tamaño});
    } catch (error) {
      console.log(error)
    }
  }
  
  
  const handleTamChange = (tamano: string) => {
    setOpcionTam({value: tamano, label: tamano});
  };
  
  const handlePresentacionChange = (presentacion: string) => {
    setOpcionPresent({value: presentacion, label: presentacion});
  };
  
  const calcularTotalPrecios = (options: any[]) => {
    const precios = options.map((item) => parseFloat(item.precio));
    return precios.reduce((total, precio) => total + precio, 0);
  };
  
  const handleChangeAcomp = (selectedOptions: any[]) => {
    const total = calcularTotalPrecios(selectedOptions);
    setPrecioExtraAcompañamiento(total);
    setSelectAcomp(selectedOptions);
  };
  
  const handleChangeExtra = (selectedOptions: any[]) => {
    const total = calcularTotalPrecios(selectedOptions);
    setPrecioExtraGuarnicion(total);
    setSelectedOptionExtra(selectedOptions);
  }
  
  
  const handleCarrito = async () => {
    try {
      const addItemsToCart = async () => {
        for (const item of selectedOptionExtra) {
          try {
            const data = {
              id_platillo: item.value, 
              id_usuario: user!.id, 
              cantidad: 1, 
              total: item.precio
            };
            const response = await apiStore.post('/shoppingcar', data)
            if (!response.data) {
              throw new Error('Error al agregar guarnición al carrito');
            }
          } catch (error) {
            console.error('Error al agregar guarnición:', error);
          }
        }
        
        for (const item of selectAcomp) {
          try {
            const data = {
              id_platillo: item.value, 
              id_usuario: user!.id, 
              cantidad: 1, 
              total: item.precio
            };
            const response = await apiStore.post('/shoppingcar', data)
            if (!response.data) {
              throw new Error('Error al agregar acompañamiento al carrito');
            }
          } catch (error) {
            console.error('Error al agregar acompañamiento:', error);
          }
        }
        try {
          // const response = await InsertarCarrito(IDPlato, id, count, precioSub);
          const data = {
            id_platillo: IDPlato, 
            id_usuario: user!.id, 
            cantidad: count, 
            total: precioSubtotal
          };
          const response = await apiStore.post('/shoppingcar', data)
          console.log(response.data)
          if (!response.data) {
            throw new Error('Error al agregar platillo al carrito');
          }
        } catch (error) {
          console.error('Error al agregar platillo:', error);
          throw error; 
        }
      };
      await addItemsToCart();
      router.push('/Carrito')
    } catch (error) {
      console.error('Error al manejar el carrito:', error);
    }
  };
  
  const handleVenta = async() =>{
    try {
        const addItemsToCart = async () => {
          for (const item of selectedOptionExtra) {
            try {
              const data = {
                id_platillo: item.value, 
                id_usuario: user!.id, 
                cantidad: 1, 
                total: item.precio
              };
              const response = await apiStore.post('/shoppingcar', data)
              console.log(response.data)
              if (!response.data) {
                throw new Error('Error al agregar guarnición al carrito');
              }
            } catch (error) {
              console.error('Error al agregar guarnición:', error);
            }
          }
          
          for (const item of selectAcomp) {
            try {
              const data = {
                id_platillo: item.value, 
                id_usuario: user!.id, 
                cantidad: 1, 
                total: item.precio
              };
              const response = await apiStore.post('/shoppingcar', data)
              if (!response.data) {
                throw new Error('Error al agregar acompañamiento al carrito');
              }
            } catch (error) {
              console.error('Error al agregar acompañamiento:', error);
            }
          }
          try {
            const data = {
              id_platillo: IDPlato, 
              id_usuario: user!.id, 
              cantidad: count, 
              total: precioSubtotal
            };
            const response = await apiStore.post('/shoppingcar', data)
            if (!response.data) {
              throw new Error('Error al agregar platillo al carrito');
            }
          } catch (error) {
            console.error('Error al agregar platillo:', error);
            throw error; 
          }
        };
        await addItemsToCart();
        router.push('/Payment');
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  if (isLoading) {
    return <ActivityIndicator size="large" color="white"  />;
  }
  
  const handleGoToCart = () => {
    Alert.alert("Go To Cart", "Navegando al carrito...");
  };
  return (
    <ScrollView style={[tw`flex-1 bg-black`,]} >
      {/* Imagen y botón */}
      <View>
        <Image
          source={{ uri: `https://labarbada.store/img/${data![0].imagen_platillo}` }}
          style={tw`w-full h-56`}
        />
      </View>

      {/* Detalles del platillo */}
      <View style={tw`p-4`}>
        <Text style={tw`text-white text-2xl font-bold mb-2`}>
          {data![0].nombre_platillo}
        </Text>
        <Text style={tw`text-red-500 text-lg font-bold mb-4`}>${precioTotal}</Text>

        {/* Tabs */}
        <View style={tw`flex-row mb-4`}>
          <TouchableOpacity style={tw`flex-1`}>
            <Text style={tw`text-white border-b-2 border-red-600 pb-2`}>
              Descripción
            </Text>
          </TouchableOpacity>
            <Text style={tw`text-white text-center flex-1 border-b-2 border-red-600 pb-2`}>
              
            </Text>
        </View>
        <Text style={tw`text-gray-400`}>
          {data![0].descripcion_platillo}
        </Text>

        {/* Tamaño y tipo */}
        <View style={tw`flex-row my-4`}>
          {/* Tamaños */}
          <View style={tw`flex-1 mr-4`}>
            <Text style={tw`text-white mb-2`}>Tamaño</Text>
            {tamaños.map((tamano, index) => (
              <ButtonDetalle
                key={index}
                text={tamano}
                isSelected={opcionTam?.value === tamano} // Comprueba si está seleccionado
                onPress={() => handleTamChange(tamano)}
              />
            ))}
          </View>

          {/* Presentaciones */}
          <View style={tw`flex-1 mr-4`}>
            <Text style={tw`text-white mb-2`}>Tipo</Text>
            {presentaciones.map((tipo, index) => (
              <ButtonDetalle
                key={index}
                text={tipo}
                isSelected={opcionPresent?.value === tipo} // Comprueba si está seleccionado
                onPress={() => handlePresentacionChange(tipo)}
              />
            ))}
          </View>
        </View>
        <View style={tw`flex-col`}>
          {/* Acompañamientos */}
          <View style={tw`mb-6`}>
            <CustomSelectPlus
              options={acompañamientos.map((item) => ({
                value: item.id_platillo_recomendado.toString(),
                label: item.platillo_recomendado,
                precio: parseFloat(item.precio_platillo_recomendado),
                extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`,
              }))}
              placeholder="Selecciona un acompañamiento"
              onChange={handleChangeAcomp}
              value={selectAcomp}
            />
          </View>

          {/* Guarniciones */}
          <View style={tw`mb-6`}>
            <CustomSelectPlus
              options={guarniciones.map((item) => ({
                value: item.id_platillo_recomendado.toString(),
                label: item.platillo_recomendado,
                precio: parseFloat(item.precio_platillo_recomendado),
                extraText: `Precio: ${item.precio_platillo_recomendado}, Tamaño: ${item.tamaño_platillo_recomendado}`,
              }))}
              placeholder="Selecciona una guarnición"
              onChange={handleChangeExtra}
              value={selectedOptionExtra}
            />
          </View>
        </View>
        {/* Botones */}
        <View style={tw`mt-6`}>
          {/* Contador y carrito */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <ButtonCount count={count} setCount={setCount} />
            <ButtonGoToCart onPress={handleCarrito} />
          </View>

          {/* Botón grande "Ordenar ahora" */}
          <TouchableOpacity
            style={[
              tw`bg-red-600 py-4 rounded-full flex-row justify-center items-center`,
              { elevation: 3 }, // Agrega un poco de sombra si es necesario
            ]}
            onPress={handleVenta}
          >
            <FontAwesome name="bell" size={24} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-bold text-lg`}>Ordenar ahora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default DescripcionPlatillo

const styles = StyleSheet.create({})