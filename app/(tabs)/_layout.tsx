// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Animated, { FadeIn } from 'react-native-reanimated';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/context/AuthContext';


export default function TabsLayout() {
  const { countCar } = useAuth();
  console.log(countCar)
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#b0251a',
      tabBarInactiveTintColor: '#b3b3b3', 
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: 'transparent', 
        borderTopWidth: 0,
        height: 80,
      },
      tabBarBackground: () => (
        <BlurView intensity={50} style={{ flex: 1 }} tint="dark" /> // Efecto blur y opacidad
      ),
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5,
      },
    }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View entering={FadeIn} style={[tw`justify-center items-center`, focused && { transform: [{ scale: 1.2 }] }]}>
              <AntDesign name="home" size={focused ? 20 : size} color={color} />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="Buscar"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View entering={FadeIn} style={[tw`justify-center items-center`, focused && { transform: [{ scale: 1.2 }] }]}>
              <AntDesign name="search1" size={focused ? 20 : size} color={color} />
            </Animated.View>
          ),
        }}
      />
  <Tabs.Screen
    name="Carrito"
    options={{
      tabBarIcon: ({ color, size, focused }) => (
        <Animated.View entering={FadeIn} style={[tw`justify-center items-center`, focused && { transform: [{ scale: 1.2 }] }]}>
          <Feather name="shopping-cart" size={focused ? 20 : size} color={color} />
          {countCar > 0 && (
            <View style={[tw`absolute rounded-full bg-red-500 h-4 w-4 justify-center items-center`, { top: -5, right: -10 }]}>
              <Text style={tw`text-white text-xs font-bold`}>{countCar}</Text>
            </View>
          )}
        </Animated.View>
      ),
    }}
  />
    </Tabs>
  );
}

/*
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              entering={FadeIn}
              style={[tw`justify-center items-center`, focused && { transform: [{ scale: 1.2 }] }]}
            >
              <AntDesign name="home" size={focused ? 24 : size} color={color} />
              {focused && (
                <View style={tw`w-5 h-1 rounded-full bg-yellow-500 mt-1`} />
              )} 
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen 
        name="Carrito" 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              entering={FadeIn}
              style={[tw`justify-center items-center`, focused && { transform: [{ scale: 1.2 }] }]}
            >
              <Feather name="shopping-cart" size={focused ? 24 : size} color={color} />
              {focused && (
                <View style={tw`w-5 h-1 rounded-full bg-yellow-500 mt-1`} />
              )}
            </Animated.View>
          ),
        }}
      />
*/