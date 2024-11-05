import { useState } from "react";
import { Div, Input, Icon, Text } from "react-native-magnus";
import { Pressable } from "react-native";

export const InputCustom = ({value, onChange, onBlur, placeholder, error, touched}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <Div m='lg'>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={(e) => {
          onBlur(e)
          setIsFocused(false)
        }}
        onFocus={()=>setIsFocused(true)}
        borderColor={isFocused ? 'blue700' : touched && error ? 'red600' : 'gray400'}
        borderWidth={2}
        p='md'
      />
      {touched && error && <Text color="red600" mt='xs' >{error}</Text>}
    </Div>
  )
}

export const InputPassword = ({value, onChange, onBlur, error, touched}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  return(
    <Div m='lg' >
      <Div row alignItems="center">
        <Input
          placeholder='contraseña'
          value={value}
          onChangeText={onChange}
          onBlur={(e) => {
            onBlur(e)
            setIsFocused(false)
          }}
          onFocus={()=>setIsFocused(true)}
          secureTextEntry={!showPassword}
          borderColor={isFocused ? 'blue700' : touched && error ? 'red600' : 'gray400'}
          borderWidth={2}
          suffix={
            <Pressable onPress={() => setShowPassword(!showPassword)} >
              <Icon
                name={setShowPassword ? 'eye' : 'eye-off'}
                fontSize='2xl'
                color="gray700"
              />
            </Pressable>
          }
        />
      </Div>
      {touched && error && <Text color="red600" mt='xs' fontSize='sm' >{error}</Text>}
    </Div>
  )
}

export const InputConfirmPassword = ({
  passwordValue,
  confirmValue,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Verificación si la contraseña y la confirmación coinciden
  const passwordsMatch = passwordValue === confirmValue;
  
  return (
    <Div m="lg">
      <Div row alignItems="center">
        <Input
          placeholder="confirmar contraseña"
          value={confirmValue}
          onChangeText={onChange}
          onBlur={(e) => {
            onBlur(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={!showConfirmPassword}
          borderColor={
            isFocused
              ? 'blue700'
              : touched && (!passwordsMatch || error)
              ? 'red600'
              : 'gray400'
          }
          borderWidth={2}
          suffix={
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                fontSize="2xl"
                color="gray700"
              />
            </Pressable>
          }
        />
      </Div>
      {touched && (!passwordsMatch || error) && (
        <Text color="red600" mt="xs" fontSize="sm">
          {passwordsMatch ? error : 'Las contraseñas no coinciden'}
        </Text>
      )}
    </Div>
  );
};

export const InputPhone = ({ value, onChange, onBlur, placeholder, error, touched }) => {
  const [isFocused, setIsFocused] = useState(false);
  // Función para manejar cambios y permitir solo números
  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Elimina cualquier carácter que no sea número
    onChange(numericValue); // Actualiza solo con números
  };
  
  return (
    <Div m="lg">
      <Input
        placeholder={placeholder}
        value={value}
        keyboardType="numeric" // Configura el teclado numérico
        onChangeText={handleTextChange} // Usa la función de manejo de cambios
        onBlur={(e) => {
          onBlur(e);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        borderColor={isFocused ? 'blue700' : touched && error ? 'red600' : 'gray400'}
        borderWidth={2}
        p="md"
      />
      {touched && error && <Text color="red600" mt="xs">{error}</Text>}
    </Div>
  );
};