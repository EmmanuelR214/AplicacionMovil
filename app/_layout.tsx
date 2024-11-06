import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

export default function RootLayout() {
  const router = useRouter()
  return (
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Register" />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
        <Stack.Screen name='DescripcionPlatillo' options={{ headerShown: true, headerStyle: {backgroundColor: 'black'},headerTintColor: 'white', headerBackTitle: 'Inicio', headerTitle: 'Descripción del Platillo', headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center p-2`}>
            <AntDesign name="arrowleft" size={20} color="white" />
            <Text style={[tw`text-white`, { fontSize: 16 }]}>Volver</Text>
          </TouchableOpacity>
        ),}} />
      </Stack>
  );
}
