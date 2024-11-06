import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { InputPhone, VerificationInput, InputEmail, InputPassword, InputPasswordConfirm } from '@/components/Inputs';
import { SignInButton } from '@/components/Buttons';
import tw from 'tailwind-react-native-classnames';

const Register = () => {
  const [step, setStep] = useState(0); // Controla el paso actual del formulario
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { control, setValue, handleSubmit, watch, formState: { errors } } = useForm();
  const originalPassword = watch('password');

  const onSubmitPhone = (data: any) => {
    console.log('Teléfono:', data.phone);
    setStep(1); // Avanza al paso del código de verificación
  };

  const onSubmitCode = (data: any) => {
    console.log('Código de Verificación:', data.verificationCode);
    setStep(2); // Avanza al paso de los datos de registro
  };

  const onSubmitRegistration = (data: any) => {
    console.log('Datos de Registro:', data);
    
    // Aquí puedes manejar la lógica final para el registro
  };

  return (
    <View style={[tw`flex-1 bg-black`, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Imagen de fondo en la parte superior */}
      <Image
        source={require('../assets/images/login.jpg')} // Reemplaza con la ruta de tu imagen
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Contenedor de contenido */}
      <View style={tw`px-6 mt-4`}>
        <Text style={tw`text-white text-3xl font-bold mb-2 text-center`}>Registrarse</Text>
        <Text style={[styles.subtitle, tw`text-center mb-6`]}>Bienvenido a <Text style={styles.highlight}>Barbada Order</Text></Text>

        {/* Paso 1: Introducir número de teléfono */}
        {step === 0 && (
          <>
            <InputPhone
              title="Teléfono"
              name="phone"
              max={10}
              min={10}
              control={control}
            />
            <View style={tw`mt-4`}>
              <SignInButton
                text="Enviar Código"
                onPress={handleSubmit(onSubmitPhone)}
                backgroundColor="#007bff"
                textColor="white"
              />
            </View>
          </>
        )}

        {/* Paso 2: Introducir código de verificación */}
        {step === 1 && (
          <>
            <VerificationInput
              title="Código de Verificación"
              name="verificationCode"
              min={6}
              max={6}
              control={control}
              setValue={setValue}
              backgroundColor="gray"
            />
            <View style={tw`mt-4`}>
              <SignInButton
                text="Verificar Código"
                onPress={handleSubmit(onSubmitCode)}
                backgroundColor="#007bff"
                textColor="white"
              />
            </View>
          </>
        )}

        {/* Paso 3: Introducir datos de registro */}
        {step === 2 && (
          <>
            <InputEmail
              title="Correo Electrónico"
              name="email"
              max={50}
              min={5}
              control={control}
            />
            <InputPassword
              title="Contraseña"
              name="password"
              max={16}
              min={8}
              control={control}
            />
            <InputPasswordConfirm
              title="Confirmar Contraseña"
              name="passwordConfirm"
              min={8}
              max={16}
              control={control}
              originalPasswordValue={originalPassword}
            />
            <View style={tw`mt-4`}>
              <SignInButton
                text="Registrar"
                onPress={handleSubmit(onSubmitRegistration)}
                backgroundColor="#007bff"
                textColor="white"
              />
            </View>
          </>
        )}

        {/* Enlaces para Login */}
        <View style={tw`mt-4`}>
          <TouchableOpacity onPress={() => router.push('/Login')} style={tw`mb-2`}>
            <Text style={[styles.linkText, tw`text-center`]}>
              Ya tienes cuenta? <Text style={styles.highlight}>Iniciar sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

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
