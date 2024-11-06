import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryButton } from "./Buttons";
import { CarouselItem } from "./Carousel";
import tw from 'tailwind-react-native-classnames';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Importa tus iconos
const categories = [
  { title: 'Dinner', icon: require('../assets/images/react-logo.png') },
  { title: 'Supper', icon: require('../assets/images/react-logo.png') },
  { title: 'Snack', icon: require('../assets/images/react-logo.png') },
  // Agrega más categorías según sea necesario
];

export const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState('Dinner');

  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4 py-2`}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.title}
            title={category.title}
            icon={category.icon}
            selected={selectedCategory === category.title}
            onPress={() => setSelectedCategory(category.title)}
          />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const carouselData = [
  {
    id: 1,
    image: require('../assets/images/react-logo.png'),
    title: 'Chicken Baked',
    time: '30 min',
    difficulty: 'Easy lvl',
  },
  // Agrega más elementos según sea necesario
];

export const FoodCarousel = () => {
  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {carouselData.map((item) => (
          <CarouselItem
            key={item.id}
            image={item.image}
            title={item.title}
            time={item.time}
            difficulty={item.difficulty}
          />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};