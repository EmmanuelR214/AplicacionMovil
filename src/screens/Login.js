import React, { useContext } from 'react'
import { Dimensions } from 'react-native'
import { Div, Text, Image} from 'react-native-magnus'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { InputCustom, InputPassword } from '../components/Inputs'
import { CustomButton, SocialButton } from '../components/Buttons'
import { AuthContext } from '../context/AuthContext'

const validate = yup.object().shape({
  usuario: yup.string()
    .min(10, 'El usuario debe tener al menos 10 caracteres')
    .required('El usuario es requerido'),
  password: yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (!@#$%^&*).'
    )
    .required('La contraseña es requerida'),
})

const Login = ({navigation}) => {
  const isCompact = true
  const {Login, errorAuth, promptAsync} = useContext(AuthContext)
  const {control, handleSubmit, formState: {errors, touchedFields}, trigger} = useForm({
    resolver: yupResolver(validate),
    mode: 'onBlur'
  })
  const insets = useSafeAreaInsets()
  const { width } = Dimensions.get('window');
  
  const onSubmit = (data) =>{
    console.log(data)
    Login(data.usuario, data.password, navigation)
  }
  
  return (
  <Div flex={1} bg="black" p="lg" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
    <Div alignItems="center" mb="lg">
      <Image
        source={require('../../assets/fondo1.jpg')}
        style={{
          width: width,
          height: 200,
        }}
        resizeMode="cover"
      />
      <Text fontSize="3xl" fontWeight="bold" color="white" mb="sm">
        Inicio de sesión
      </Text>
      <Text fontSize="lg" color="white">
        Bienvenido a <Text color="red500">Barbada Order</Text>
      </Text>
    </Div>
    
    <Div w="100%" alignItems="center" justifyContent='center'  >
      <Div w="88%"  justifyContent='center' >
        <Controller
          control={control}
          name="usuario"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputCustom
              value={value}
              placeholder={'Correo/Télefono'}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.usuario?.message}
              touched={touchedFields.usuario}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputPassword
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              touched={touchedFields.password}
            />
          )}
        />
        {errorAuth && <Text color="red600" mt="sm">{errorAuth}</Text>}
        <CustomButton
        title="Iniciar sesión"
        onPress={handleSubmit(onSubmit)}
        mt="lg"
        bg="blue600"
        color="white"
        rounded="lg"
        fontSize="lg"
        p="lg"
        w="90%" 
        block={false}
        alignSelf="center"
      />
      </Div>
    </Div>
    
    <Div flexDir='row' justifyContent='center' alignItems='center' p='lg' >
      <SocialButton
        iconName="google"
        iconFamily="FontAwesome"
        label="Google"
        bgColor="white"
        textColor="black"
        isCompact={isCompact}
        onPress={() => promptAsync()}
      />
      <SocialButton
        iconName="facebook"
        iconFamily="FontAwesome"
        label="Facebook"
        bgColor="blue500"
        textColor="white"
        isCompact={isCompact}
        onPress={() => console.log('Facebook Button Pressed')}
      />
      <SocialButton
        iconName="apple"
        iconFamily="FontAwesome"
        label="Apple"
        bgColor="black"
        textColor="white"
        isCompact={isCompact}
        onPress={() => console.log('Apple Button Pressed')}
      />
    </Div>
    
    <Div w="100%" alignItems="center" justifyContent="center" mb="lg">
      <Text fontSize="sm" color="white" textAlign="center" mt="lg">
        ¿Olvidaste tu contraseña?{' '}
        <Text color="blue500" onPress={() => console.log('Recuperar contraseña')}>
          Recuperar contraseña
        </Text>
      </Text>
      <Text fontSize="sm" color="white" textAlign="center" mt="sm">
        ¿Aún no tienes cuenta?{' '}
        <Text color="blue500" onPress={() => console.log('Navegar a registro')}>
          Regístrate
        </Text>
      </Text>
    </Div>
  </Div>
  ) 
}

export default Login