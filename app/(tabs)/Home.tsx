import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames';
import { FoodCard } from '@/components/Cards';
import { CategorySelector, FoodCarousel } from '@/components/Contents';
import { DrawerComponent } from '@/components/Modal';

const foodData = [
  {
    id: 1,
    image: require('../../assets/images/react-logo.png'),
    title: 'Garlic Shrimp Spaghetti',
    description: 'Spicy shrimp with garlic',
    price: '15.00',
    isFavorite: true,
  },
  {
    id: 2,
    image: require('../../assets/images/react-logo.png'),
    title: 'Penne Chicken Carbonara',
    description: 'Creamy pasta with chicken',
    price: '12.00',
    isFavorite: false,
  },
  // Agrega más datos de comida si lo necesitas
];

const Home = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const insets = useSafeAreaInsets()
  return (
    <ScrollView style={[tw`flex-1 bg-black px-4`, {paddingTop: insets.top}]}  >
      {/* Header */}
      <View style={tw`flex-row items-center justify-between mt-6`}>
        <Text style={tw`text-white text-2xl font-bold`}>Hi, Arnold</Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={tw`bg-yellow-500 w-10 h-10 rounded-full items-center justify-center`}>
          <Text style={tw`text-white text-lg`}>A</Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-gray-400 text-lg mt-2`}>Ready to cook for dinner?</Text>
      
      <View style={tw`mt-4 items-center`}>
        <FoodCarousel/>
      </View>
      
      <View style={tw`mt-6`}>
        <Text style={tw`text-white text-xl font-bold`}>Meal Category</Text>
        <View style={tw`flex-row items-center justify-between`}>
          <CategorySelector />
          <Text style={tw`text-yellow-500 text-sm`}>See All</Text>
        </View>
      </View>
      
      <View style={tw`mt-4`}>
        <View style={tw`flex-row flex-wrap justify-between`}>
          {foodData.map((item) => (
              <FoodCard
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                isFavorite={item.isFavorite}
                onFavoritePress={() => console.log('Toggle favorite', item.id)}
              />
            ))}
          </View>
        </View>
        <DrawerComponent visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})