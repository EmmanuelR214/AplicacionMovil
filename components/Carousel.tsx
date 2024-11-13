import { View, Text, Image, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface CarouselItemProps {
  image: any;
  title: string;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ image, title}) => {
  return (
    <View style={[tw`rounded-2xl p-4 bg-gray-900`, styles.carouselItem]}>
      <Image source={ {uri: `https://labarbada.store/img/${image}`} } style={tw`w-full h-24 rounded-lg`} resizeMode="cover" />
      <Text style={tw`text-yellow-500 text-lg font-bold mt-3`}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: 280,
    marginRight: 12,
  },
});