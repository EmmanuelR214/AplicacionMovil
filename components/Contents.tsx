import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryButton } from "./Buttons";
import { CarouselItem } from "./Carousel";
import tw from 'tailwind-react-native-classnames';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { apiStore, apiUser } from "@/utils/api/axios";

// Importa tus iconos
const categories = [
  { title: 'Dinner', icon: require('../assets/images/react-logo.png') },
  { title: 'Supper', icon: require('../assets/images/react-logo.png') },
  { title: 'Snack', icon: require('../assets/images/react-logo.png') },
  // Agrega más categorías según sea necesario
];

interface CategoryButtonProps {
  id_categoria: string;
  descripcionCategoria: string;
  nombreCategoria: string;
}

interface CategorySelectorProps {
  setCategori: React.Dispatch<React.SetStateAction<number>>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({setCategori}) => {
  const [selectedCategory, setSelectedCategory] = useState('Dinner');
  const [categories, setCategories] = useState<CategoryButtonProps[]>([]);
  
  useEffect(() => {
    async function fetch() {
      const result = await apiStore.get('/categorias')
      setCategories(result.data)
    }
    fetch()
  }, []);
  
  const handleCategoryPress = (categoryId: string) => () =>{
    setSelectedCategory(categoryId);
    const idCategoria = parseInt(categoryId);
    setCategori(idCategoria)
  };
  
  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4 py-2`}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id_categoria}
            title={category.nombreCategoria}
            selected={selectedCategory === category.id_categoria}
            onPress={handleCategoryPress(category.id_categoria)}
          />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};  

interface CarouselItemProps {
  id: string;
  imagen: string;
  posicion: string;
}

export const FoodCarousel = () => {
  const [carouselData, setCarouselData] = useState<CarouselItemProps[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await apiUser.get('/publicidad')
      setCarouselData(res.data)
    }
    fetch()
  }, [])
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
            image={item.imagen}
            title={item.posicion}
          />
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};