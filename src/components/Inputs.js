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