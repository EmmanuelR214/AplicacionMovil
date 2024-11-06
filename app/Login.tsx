import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { InputDesign, InputPassword } from '@/components/Inputs';
import { SignInButton } from '@/components/Buttons';
import tw from 'tailwind-react-native-classnames';
import { useRouter } from 'expo-router';

export const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      router.push('/Home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[tw`flex-1 bg-black`, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Imagen de fondo en la parte superior */}
      <Image
        source={require('../assets/images/login.jpg')} // Reemplaza con la ruta de tu imagen
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Contenedor de contenido de inicio de sesión */}
      <View style={tw`px-6 mt-4`}>
        <Text style={tw`text-white text-3xl font-bold mb-2 text-center`}>Inicio de sesión</Text>
        <Text style={[styles.subtitle, tw`text-center mb-6`]}>Bienvenido a <Text style={styles.highlight}>Barbada Order</Text></Text>

        {/* Campo de correo o teléfono */}
        <InputDesign
          title="Nombre de usuario"
          name="username"
          max={100}
          min={10}
          control={control}
          testID="username-input"
        />

        {/* Campo de contraseña */}
        <InputPassword
          title="Contraseña"
          name="password"
          max={16}
          min={8}
          control={control}
          testID="password-input"
        />

        {/* Botón de inicio de sesión */}
        <View style={tw`mt-4`}>
          <SignInButton
            text="INICIAR SESION"
            onPress={handleSubmit(onSubmit)}
            backgroundColor="#007bff"
            textColor="white"
            testID="login-button"
          />
        </View>

        {/* Enlaces de "Olvidaste tu contraseña?" y "Registrate" */}
        <View style={tw`mt-4`}>
          <TouchableOpacity style={tw`mb-2`} onPress={() => alert('JAJJAJA por burro')}>
            <Text style={styles.linkText}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/Register')} style={tw`mb-2`}>
            <Text style={[styles.linkText, tw`text-center`]}>
              No tienes cuenta? <Text style={styles.highlight}>Registrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 180,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  highlight: {
    color: '#ff4d4d', // Color rojo para resaltar el nombre de la app
    fontWeight: 'bold',
  },
  linkText: {
    color: '#1e90ff', // Color azul para los enlaces
    fontSize: 14,
    textAlign: 'center',
  },
});
