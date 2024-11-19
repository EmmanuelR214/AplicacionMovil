import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import tw from 'tailwind-react-native-classnames';
import { SignInButton } from "@/components/Buttons";
import { useRouter } from 'expo-router';
import { auth } from '@/utils/firebase/firebase';

import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const HomeScreen = () => {
  const router = useRouter();

  // Configura los ID de cliente para Expo, iOS y Android
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: '1012294754360-tfebn95p4n25ti601hep3f9sru01llhq.apps.googleusercontent.com',
    androidClientId: '1012294754360-jf12obd88ofqf83e6ooncrgataa0pktj.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          router.push('/Home'); // Navega a la pantalla de inicio
        })
        .catch((error) => {
          console.log('Error al iniciar sesión con Google:', error);
        });
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleFacebookSignIn = () => {
    console.log('Iniciar sesión con Facebook');
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo.jpg')}
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
          onPress={() => router.push('/Login')}
          text="Iniciar sesión"
          icon="sign-in"
          backgroundColor="#ba2216"
          textColor="white"
        />
        <SignInButton
          onPress={() => router.push('/Register')}
          text="Registrarse"
          icon="user"
          backgroundColor="#ba2216"
          textColor="white"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;


/*
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
*/