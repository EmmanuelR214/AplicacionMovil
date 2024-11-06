import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';

interface FoodCardProps {
  image: any; // Ruta de la imagen o icono
  title: string;
  description: string;
  price: string;
  onFavoritePress: () => void;
  isFavorite: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  description,
  price,
  onFavoritePress,
  isFavorite,
}) => {
  const router = useRouter();
  return (
    <View style={tw`bg-gray-900 p-4 rounded-2xl w-40 shadow-lg`}>
      {/* Imagen del platillo */}
      <TouchableOpacity onPress={() => router.push('/DescripcionPlatillo')} >
        <Image source={image} style={tw`w-full h-24 rounded-lg`} resizeMode="cover" />
      </TouchableOpacity>
      
      {/* Información del platillo */}
      <Text style={tw`text-white text-lg font-bold mt-3`}>{title}</Text>
      <Text style={tw`text-gray-400 text-sm`}>{description}</Text>
      
      {/* Precio y botón de favorito */}
      <View style={tw`flex-row items-center justify-between mt-2`}>
        <Text style={tw`text-white font-bold text-base`}>${price}</Text>
        <TouchableOpacity onPress={onFavoritePress}>
          <FontAwesome
            name="heart"
            size={18}
            color={isFavorite ? '#FF6347' : '#4B5563'} // Color si es favorito o no
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
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  image,
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <View style={tw`flex-row items-center justify-between bg-gray-900 p-4 rounded-lg mb-4`}>
      {/* Imagen del platillo */}
      <Image source={image} style={tw`w-16 h-16 rounded-full`} resizeMode="cover" />

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
      </View>
    </View>
  );
};