import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect, useMemo} from 'react'
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InputSearch } from '@/components/Inputs';
import tw from 'tailwind-react-native-classnames';
import { apiStore } from '@/utils/api/axios';
import { FoodCard } from '@/components/Cards';
import { useAuth } from '@/context/AuthContext';

interface FoodCardProps {
  id_relacion: number;
  nombre_platillo: string;
  estado: string;
  imagen_platillo: string;
  precio: number;
  
}

const fetchPlatillos = async (): Promise<FoodCardProps[]> => {
  const result = await apiStore.get('/menu');
  return result.data[0];
};

const buscarPlatillosPorNombre = async (nombre: string): Promise<FoodCardProps[]> => {
  const result = await apiStore.get(`/menu-nombre`, { params: { nombre } });
  return result.data[0];
};

const Buscar = () => {
  const insets = useSafeAreaInsets()
  const [platillos, setPlatillos] = useState<FoodCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false); // Estado de carga durante la búsqueda
  const [noResult, setNoResult] = useState(false);
  const {handleAddCarrito} = useAuth()
  
  // Cargar todos los platillos al inicio
    useEffect(() => {
      const loadInitialPlatillos = async () => {
        const initialPlatillos = await fetchPlatillos();
        setPlatillos(initialPlatillos);
        setIsLoading(false);
      };
      loadInitialPlatillos();
    }, []);
  
    // Actualizar platillos en base al searchTerm
    useEffect(() => {
      const fetchFilteredPlatillos = async () => {
        setIsSearching(true);
        try {
          if (searchTerm === '') {
            // Si no hay término de búsqueda, cargar todos los platillos
            const allPlatillos = await fetchPlatillos();
            setPlatillos(allPlatillos);
            setNoResult(false);
          } else {
            // Si hay término de búsqueda, cargar platillos filtrados
            const filteredPlatillos = await buscarPlatillosPorNombre(searchTerm);
            setPlatillos(filteredPlatillos);
            setNoResult(filteredPlatillos.length === 0);
          }
        } catch (error) {
          console.error('Error al buscar platillos:', error);
          setPlatillos([]);
          setNoResult(true);
        }
        finally{
          setIsSearching(false);
        }
      };
      fetchFilteredPlatillos();
    }, [searchTerm]);
  
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    console.log('Search Term:', text);
  };
  
  const sortedListMenu = useMemo(() => {
    return [...platillos].sort((a, b) => {
      if (a.estado === 'oferta' && b.estado !== 'oferta') return -1;
      if (a.estado !== 'oferta' && b.estado === 'oferta') return 1;
      if (a.estado === 'nuevo' && b.estado !== 'nuevo') return -1;
      if (a.estado !== 'nuevo' && b.estado === 'nuevo') return 1;
      return 0;
    });
  }, [platillos]);
  
  if (isLoading) {
    return (
      <View style={[tw`flex-1 bg-black`, { paddingTop: insets.top }]}>
        <Text style={tw`text-white text-center mt-4`}>Cargando...</Text>
      </View>
    );
  }  
  return (
    <View style={[tw`flex-1 bg-black`, { paddingTop: insets.top }]}>
      <Text style={tw`text-white text-2xl font-bold`}>Buscar</Text>
      <InputSearch change={handleSearchChange} />
      <View style={tw`mt-4 flex-1`}>
        {isSearching ? (
          <Text style={tw`text-white text-center mt-4`}>Buscando...</Text>
        ) : (
          <ScrollView
            horizontal={false}
            contentContainerStyle={[tw`px-4`, { paddingBottom: 160 }]}
          >
            {platillos.length > 0 ? (
              <View style={tw`flex-row flex-wrap -mx-2`}>
                {platillos.map((item) => (
                  <View key={item.id_relacion} style={tw`w-1/2 px-5 mb-6`}>
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
            ) : (
              <Text style={tw`text-white text-center mt-4`}>
                {noResult ? 'Sin resultados' : 'No hay platillos disponibles'}
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

export default Buscar

const styles = StyleSheet.create({})