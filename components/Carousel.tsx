import { View, Text, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';

interface CarouselItemProps {
  image: any;
  title: string;
  time: string;
  difficulty: string;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ image, title, time, difficulty }) => {
  return (
    <View style={[tw`rounded-2xl p-4 bg-gray-900`, styles.carouselItem]}>
      <Image source={image} style={tw`w-full h-24 rounded-lg`} resizeMode="cover" />
      <Text style={tw`text-yellow-500 text-lg font-bold mt-3`}>{title}</Text>
      <View style={tw`flex-row items-center mt-2`}>
        <FontAwesome name="clock-o" size={14} color="yellow" />
        <Text style={tw`text-gray-400 text-xs ml-1`}>{time}</Text>
        <View style={tw`flex-row items-center ml-4`}>
          <FontAwesome name="star" size={14} color="yellow" />
          <Text style={tw`text-gray-400 text-xs ml-1`}>{difficulty}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: 280,
    marginRight: 12,
  },
});