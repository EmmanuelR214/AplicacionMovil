import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StripeProvider } from '@stripe/stripe-react-native';
import tw from 'tailwind-react-native-classnames';
import { AuthProvider } from '@/context/AuthContext';

const queryClient = new QueryClient()

export default function RootLayout() {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StripeProvider publishableKey='pk_test_51QL5JHDaa5v2RqnY7sNW3XW5JFrrDRZxqbTE3dOTegRbmEfi2c9xfYpJURt7Nl6sV5Nw1ChKdSjY5zwv5Z50OxUx00is3hXr7Y' >
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            <Stack.Screen name='Login' />
            <Stack.Screen name="Register" />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
            <Stack.Screen name='DescripcionPlatillo' options={{ headerShown: true, headerStyle: {backgroundColor: 'black'},headerTintColor: 'white', headerBackTitle: 'Inicio', headerTitle: 'Descripción del Platillo', headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center p-2`}>
                <AntDesign name="arrowleft" size={20} color="white" />
                <Text style={[tw`text-white`, { fontSize: 16 }]}>Volver</Text>
              </TouchableOpacity>
            ),}} />
            <Stack.Screen name='Payment' options={{ headerShown: true, headerStyle: {backgroundColor: 'black'},headerTintColor: 'white', headerBackTitle: 'Inicio', headerTitle: '', headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center p-2`}>
                <AntDesign name="arrowleft" size={20} color="white" />
                <Text style={[tw`text-white`, { fontSize: 16 }]}>Volver</Text>
              </TouchableOpacity>
            ),}} />
          </Stack>
        </AuthProvider>
        </StripeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
