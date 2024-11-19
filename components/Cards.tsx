import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter} from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodCardProps {
  image: any; 
  title: string;
  price: number;
  estado?: string;
  onFavoritePress: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  price,
  onFavoritePress,
  estado,
}) => {
  const router = useRouter();
  const redirectToDescription = async() => {
    try {
      await AsyncStorage.setItem('platillo', title)
      router.push('/DescripcionPlatillo')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={tw`bg-gray-900 p-4 rounded-2xl w-40 h-60 shadow-lg`}>
      {(estado === 'oferta' || estado === 'nuevo') && (
        <View
          style={[
            tw`absolute top-0 right-0 px-2 py-1 text-white text-sm font-bold rounded-l z-10`,
            { backgroundColor: estado === 'oferta' ? '#e74c3c' : '#35bcb5' },
          ]}
        >
          <Text style={tw`text-white`}>{estado}</Text>
        </View>
      )}
      {/* Imagen del platillo */}
      <TouchableOpacity onPress={redirectToDescription} >
        <Image source={{uri:`https://labarbada.store/img/${image}`}} style={tw`w-full h-24 rounded-lg`} resizeMode="cover" />
      </TouchableOpacity>
      
      {/* Información del platillo */}
      <Text style={tw`text-white text-lg font-bold mt-3`}>{title}</Text>
      
      {/* Precio y botón de favorito */}
      <View style={tw`flex-row items-center justify-between mt-2`}>
        <Text style={tw`text-yellow-500 font-bold text-base`}>${price}</Text>
        <TouchableOpacity onPress={onFavoritePress}>
          <Feather
            name="shopping-cart"
            size={18}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface CartItemCardProps {
  image: any;
  title: string;
  price: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  image,
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  return (
    <View style={tw`flex-row items-center justify-between bg-gray-900 p-4 rounded-lg mb-4`}>
      {/* Imagen del platillo */}
      <Image source={{uri:`https://labarbada.store/img/${image}`}} style={tw`w-16 h-16 rounded-full`} resizeMode="cover" />

      {/* Información del platillo */}
      <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-white text-lg font-semibold`}>{title}</Text>
        <Text style={tw`text-gray-400 text-sm`}>
          ${price} <Text style={tw`text-white`}>x{quantity}</Text>
        </Text>
      </View>

      {/* Controles de cantidad */}
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity onPress={onDecrease} style={tw`bg-gray-800 p-2 rounded-lg`}>
          <FontAwesome name="minus" size={16} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white mx-2`}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={tw`bg-gray-800 p-2 rounded-lg`}>
          <FontAwesome name="plus" size={16} color="white" />
        </TouchableOpacity>
        <View style={tw`p-2 ml-2`} >
          <TouchableOpacity onPress={onDelete}>
            <FontAwesome name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface Item {
  nombre_platillo: string;
  cantidad: number;
  subtotal: string; // Puedes cambiar a `number` si los subtotales ya son números
}

interface ResumenPagoProps {
  items: Item[];
}

export const ResumenPago: React.FC<ResumenPagoProps> = ({ items }) => {
  // Calcula el total a pagar sumando los subtotales
  const totalAPagar = items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={tw`flex-row justify-between border-b border-gray-700 py-2`}>
      <Text style={tw`text-white flex-1`}>{item.nombre_platillo}</Text>
      <Text style={tw`text-white text-center flex-1`}>{item.cantidad}</Text>
      <Text style={tw`text-white text-right flex-1`}>${parseFloat(item.subtotal).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={tw`bg-gray-900 text-white rounded-lg p-6 shadow-lg`}>
      <Text style={tw`text-xl font-semibold mb-4 text-white`}>Resumen de Pago</Text>
      {/* Encabezado de la lista */}
      <View style={tw`hidden justify-between border-b border-gray-700 pb-2 mb-4`}>
        <Text style={tw`flex-1 text-white`}>Producto</Text>
        <Text style={tw`text-center flex-1 text-white`}>Cantidad</Text>
        <Text style={tw`text-right flex-1 text-white`}>Precio</Text>
      </View>
      {/* Lista de productos */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`mb-4`}
      />
      {/* Total a pagar */}
      <View style={tw`flex-row justify-between text-xl font-bold mt-4`}>
        <Text style={tw`text-white text-lg`}>Total a Pagar:</Text>
        <Text style={tw`text-white text-lg`}>${totalAPagar.toFixed(2)}</Text>
      </View>
    </View>
  );
};