import { StyleSheet, ImageBackground, View, Image} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { SignInButton } from "@/components/Buttons";
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  
  const router = useRouter();
  
  
  const handleGoogleSignIn = () => {
    console.log('Iniciar sesión con Google');
  };

  const handleFacebookSignIn = () => {
    console.log('Iniciar sesión con Facebook');
  };
  
  
  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')} // Reemplaza con la ruta de tu imagen de fondo
      style={tw`flex-1 justify-between p-10`}
    >
      {/* Logotipo en la parte superior */}
      <View style={tw`items-center mt-12`}>
        <Image
          source={require('../assets/images/emblema.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Botones de inicio de sesión en la parte inferior */}
      <View style={tw`mb-8`}>
        <SignInButton
          onPress={handleGoogleSignIn}
          text="Iniciar con Google"
          icon="google"
          backgroundColor="white"
          textColor="#202020"
        />
        <SignInButton
          onPress={handleFacebookSignIn}
          text="Iniciar con Facebook"
          icon="facebook"
          backgroundColor="#1877F2"
          textColor="white"
        />
        <SignInButton
          onPress={() => router.push('/Login')}
          text="Iniciar sesión"
          icon="sign-in"
          backgroundColor="#ba2216" // Color azul oscuro
          textColor="white"
        />
        <SignInButton
          onPress={() => router.push('/Register')}
          text="Registrarse"
          icon="user"
          backgroundColor="#ba2216" // Color azul oscuro
          textColor="white"
        />
      </View>
    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 100,
  },
});