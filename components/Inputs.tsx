import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, FlatList, Keyboard  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { FadeIn, useAnimatedStyle, withTiming, FadeOut  } from 'react-native-reanimated';
import { useController, UseControllerProps } from 'react-hook-form';
import tw from 'tailwind-react-native-classnames';

interface InputDesignProps extends UseControllerProps {
  title: string;
  max: number;
  min: number;
  backgroundColor?: string;
  testID?: string;
}

export const InputDesign: React.FC<InputDesignProps> = ({
  title,
  name,
  control,
  max,
  min,
  backgroundColor = 'white',
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      minLength: { value: min, message: `${title} debe ser mayor a ${min} caracteres` },
      maxLength: { value: max, message: `${title} debe ser menor a ${max} caracteres` },
    },
  });

  // Estilo animado para el label flotante
  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: isFocused || value ? withTiming(-15) : withTiming(14),
    left: 10,
    fontSize: isFocused || value ? withTiming(14) : withTiming(16),
    color: isFocused || value ? 'white' : 'black',
  }));

  return (
    <View style={tw`relative w-full mb-4`}>
      <Animated.Text
        entering={FadeIn}
        style={[
          tw`absolute text-gray-500 z-10`,
          animatedLabelStyle,
        ]}
      >
        {title}
      </Animated.Text>
      <View style={[tw`flex-row items-center px-3 py-2 rounded-lg`, { backgroundColor }]}>
        <TextInput
          style={tw`flex-1 text-black p-2`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onChangeText={onChange}
          value={value}
          testID={testID}
          {...textInputProps}
        />
        <FontAwesome name='user' size={20} color="black" />
      </View>
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
    </View>
  );
};

interface InputPasswordProps extends UseControllerProps {
  title: string;
  max: number;
  min: number;
  backgroundColor?: string;
  testID?: string;
}

export const InputPassword: React.FC<InputPasswordProps & TextInputProps> = ({
  title,
  name,
  control,
  max,
  min,
  backgroundColor = 'white',
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/;

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      minLength: { value: min, message: `${title} debe ser mayor a ${min} caracteres` },
      maxLength: { value: max, message: `${title} debe ser menor a ${max} caracteres` },
      pattern: {
        value: passwordPattern,
        message: `${title} debe cumplir con los requisitos de seguridad`,
      },
    },
  });

  // Maneja la validación personalizada para los mensajes de error específicos
  const handleChange = (text: string) => {
    onChange(text);

    const messages: string[] = [];
    if (!/[A-Z]/.test(text)) messages.push('Debe contener al menos una letra mayúscula.');
    if (!/[a-z]/.test(text)) messages.push('Debe contener al menos una letra minúscula.');
    if (!/\d/.test(text)) messages.push('Debe contener al menos un número.');
    if (!/[!@#$%^&*]/.test(text)) messages.push('Debe contener al menos un carácter especial (!@#$%^&*).');

    setErrorMessages(messages);
  };

  // Estilo animado para el label flotante
  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: isFocused || value ? withTiming(-15) : withTiming(14),
    left: 10,
    fontSize: isFocused || value ? withTiming(14) : withTiming(16),
    color: isFocused || value ? 'white' : 'black',
  }));

  return (
    <View style={tw`relative w-full mb-4`}>
      <Animated.Text
        entering={FadeIn}
        style={[
          tw`absolute text-gray-500 z-10`,
          animatedLabelStyle,
        ]}
      >
        {title}
      </Animated.Text>
      <View style={[tw`flex-row items-center px-3 py-2 rounded-lg`, { backgroundColor }]}>
        <TextInput
          style={tw`flex-1 text-black p-2`}
          secureTextEntry={!showPass} // Cambia entre texto y contraseña
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onChangeText={handleChange}
          value={value}
          testID={testID}
          {...textInputProps}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <FontAwesome name={showPass ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* Mensaje de error principal */}
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
      {/* Mensajes de error adicionales de validación */}
      <View style={tw`w-full`}>
        {errorMessages.map((message, index) => (
          <Text key={index} style={tw`text-red-500 text-xs`}>
            {message}
          </Text>
        ))}
      </View>
    </View>
  );
};

interface InputPasswordConfirmProps extends UseControllerProps {
  title: string;
  max: number;
  min: number;
  backgroundColor?: string;
  originalPasswordValue: string; // Para pasar el valor de la contraseña original
}

export const InputPasswordConfirm: React.FC<InputPasswordConfirmProps & TextInputProps> = ({
  title,
  name,
  control,
  max,
  min,
  backgroundColor = 'white',
  originalPasswordValue,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      validate: (value) => value === originalPasswordValue || 'Las contraseñas no coinciden',
      minLength: {
        value: min,
        message: `${title} debe ser mayor a ${min} caracteres`,
      },
      maxLength: {
        value: max,
        message: `${title} debe ser menor a ${max} caracteres`,
      },
    },
  });

  // Estilo animado para el label flotante
  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: isFocused || value ? withTiming(-15) : withTiming(14),
    left: 10,
    fontSize: isFocused || value ? withTiming(14) : withTiming(16),
    color: isFocused || value ? 'white' : 'black',
  }));

  return (
    <View style={tw`relative w-full mb-4`}>
      <Animated.Text
        entering={FadeIn}
        style={[tw`absolute text-gray-500 z-10`, animatedLabelStyle]}
      >
        {title}
      </Animated.Text>
      <View style={[tw`flex-row items-center px-3 py-2 rounded-lg`, { backgroundColor }]}>
        <TextInput
          style={tw`flex-1 text-black p-2`}
          secureTextEntry={!showPass} // Cambia entre texto y contraseña
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onChangeText={onChange}
          value={value}
          {...textInputProps}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <FontAwesome name={showPass ? 'eye' : 'eye-slash'} size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* Mensaje de error */}
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
    </View>
  );
};

interface InputPhoneProps extends UseControllerProps {
  title: string;
  max: number;
  min: number;
  backgroundColor?: string;
}

export const InputPhone: React.FC<InputPhoneProps & TextInputProps> = ({
  title,
  name,
  control,
  max,
  min,
  backgroundColor = 'white',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      minLength: {
        value: min,
        message: `${title} debe ser mayor a ${min} caracteres`,
      },
      maxLength: {
        value: max,
        message: `${title} debe ser menor a ${max} caracteres`,
      },
      pattern: {
        value: /^[0-9]+$/,
        message: 'Ingrese un teléfono válido',
      },
    },
  });

  // Maneja el cambio de entrada y la validación personalizada
  const handleChange = (text: string) => {
    const filteredText = text.replace(/[^0-9]/g, '').slice(0, 10); // Solo permite números y limita a 10 caracteres
    onChange(filteredText);

    const messages: string[] = [];
    if (filteredText.length < 10) messages.push('El teléfono debe ser igual a 10 caracteres');
    setErrorMessages(messages);
  };

  // Estilo animado para el label flotante
  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: isFocused || value ? withTiming(-15) : withTiming(14),
    left: 10,
    fontSize: isFocused || value ? withTiming(14) : withTiming(16),
    color: isFocused || value ? 'white' : 'black',
  }));

  return (
    <View style={tw`relative w-full mb-4`}>
      <Animated.Text
        entering={FadeIn}
        style={[tw`absolute text-gray-500 z-10`, animatedLabelStyle]}
      >
        {title}
      </Animated.Text>
      <View style={[tw`flex-row items-center px-3 py-2 rounded-lg`, { backgroundColor }]}>
        <TextInput
          style={tw`flex-1 text-black p-2`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onChangeText={handleChange}
          value={value}
          keyboardType="numeric" // Establece el teclado numérico para teléfonos
          {...textInputProps}
        />
        <FontAwesome name="phone" size={20} color="black" />
      </View>
      {/* Mensaje de error principal */}
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
      {/* Mensajes de error adicionales de validación */}
      <View style={tw`w-full`}>
        {errorMessages.map((message, index) => (
          <Text key={index} style={tw`text-red-500 text-xs`}>
            {message}
          </Text>
        ))}
      </View>
    </View>
  );
};

interface VerificationInputProps extends UseControllerProps {
  title: string;
  min: number;
  max: number;
  pattern?: string;
  backgroundColor?: string;
  setValue: (name: string, value: string) => void;
}

export const VerificationInput: React.FC<VerificationInputProps & TextInputProps> = ({
  title,
  name,
  control,
  min,
  max,
  pattern = '[^0-9]', // Define un patrón para solo números por defecto
  backgroundColor = 'white',
  setValue,
  ...textInputProps
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const {
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      minLength: {
        value: min,
        message: `${title} debe ser mayor a ${min} caracteres`,
      },
      maxLength: {
        value: max,
        message: `${title} debe ser menor a ${max} caracteres`,
      },
    },
  });

  // Actualiza el estado del código en el formulario
  useEffect(() => {
    setValue(name, code.join(''));
  }, [code, name, setValue]);

  // Maneja el cambio en cada campo de entrada
  const handleChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(new RegExp(pattern), ''); // Aplica el patrón
    const newCode = [...code];
    newCode[index] = sanitizedValue;

    setCode(newCode);

    // Enfoca el siguiente campo si hay un valor en el actual
    if (sanitizedValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Maneja el retroceso para cambiar el enfoque
  const handleKeyDown = (index: number, key: string) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={tw`mb-4`}>
      {/* Etiqueta animada */}
      <Animated.Text
        entering={FadeIn}
        style={[
          tw`text-gray-500 z-10 mb-2 text-center`,
          { fontSize: 16, color: 'white' },
        ]}
      >
        {title}
      </Animated.Text>

      {/* Contenedor de los campos de entrada individuales */}
      <View style={tw`flex-row justify-center`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            style={tw`w-12 h-12 text-xl text-center border border-gray-300 rounded-md mx-1 bg-white`}
            maxLength={1}
            value={code[index] || ''}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(index, value)}
            onKeyPress={({ nativeEvent }) => handleKeyDown(index, nativeEvent.key)}
            {...textInputProps}
          />
        ))}
      </View>

      {/* Mensaje de error */}
      {error && <Text style={tw`text-red-500 text-xs mt-1 text-center`}>{error.message}</Text>}
    </View>
  );
};

interface InputEmailProps extends UseControllerProps {
  title: string;
  max: number;
  min: number;
  backgroundColor?: string;
}

export const InputEmail: React.FC<InputEmailProps & TextInputProps> = ({
  title,
  name,
  control,
  max,
  min,
  backgroundColor = 'white',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: `${title} es requerido`,
      pattern: {
        value: emailPattern,
        message: 'Ingrese un correo electrónico válido',
      },
      minLength: {
        value: min,
        message: `${title} debe ser mayor a ${min} caracteres`,
      },
      maxLength: {
        value: max,
        message: `${title} debe ser menor a ${max} caracteres`,
      },
    },
  });

  // Estilo animado para el label flotante
  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: isFocused || value ? withTiming(-15) : withTiming(14),
    left: 10,
    fontSize: isFocused || value ? withTiming(14) : withTiming(16),
    color: isFocused || value ? 'white' : 'black',
  }));

  return (
    <View style={tw`relative w-full mb-4`}>
      <Animated.Text
        entering={FadeIn}
        style={[tw`absolute text-gray-500 z-10`, animatedLabelStyle]}
      >
        {title}
      </Animated.Text>
      <View style={[tw`flex-row items-center px-3 py-2 rounded-lg`, { backgroundColor }]}>
        <TextInput
          style={tw`flex-1 text-black p-2`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onChangeText={onChange}
          value={value}
          keyboardType="email-address" // Configura el teclado para emails
          {...textInputProps}
        />
        <FontAwesome name="envelope" size={20} color="black" />
      </View>
      {/* Mensaje de error */}
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
    </View>
  );
};

interface InputSearchProps extends TextInputProps {
  change: (text: string) => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({ change, ...textInputProps }) => {
  return (
    <View style={tw`relative w-full mb-4`}>
      <View style={tw`relative`}>
        <TextInput
          style={tw`text-white rounded-lg p-3 pr-10 pl-12 text-xl bg-gray-800`}
          placeholder="Buscar"
          placeholderTextColor="gray"
          onChangeText={change}
          {...textInputProps}
        />
        <View style={tw`absolute inset-y-0 left-0 flex items-center justify-center w-12`}>
          <AntDesign name="search1" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange }) => {
  // Formato de la cantidad de dinero
  const formatCurrency = (value: string) => {
    return Number(value).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).replace('$', '');
  };

  const [inputValue, setInputValue] = useState<string>(formatCurrency(value.toString()));

  // Manejador de cambio de valor
  const handleChange = (text: string) => {
    const rawValue = text.replace(/,/g, '');
    if (!isNaN(Number(rawValue))) {
      const formattedValue = formatCurrency(rawValue);
      setInputValue(formattedValue);
      onChange && onChange(Number(rawValue));
    }
  };

  return (
    <View style={tw`relative`}>
      {/* Icono de dólar */}
      <View style={tw`absolute inset-y-0 left-0 flex items-center justify-center pl-2 `}>
        <FontAwesome name="dollar" size={20} color="green" />
      </View>
      {/* Input de texto para el valor */}
      <Animated.View entering={FadeIn}>
        <TextInput
          style={tw`text-white bg-transparent p-2 border border-gray-300 shadow-sm pl-8 pr-2 py-2 rounded-md`}
          value={inputValue}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="white"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </Animated.View>
    </View>
  );
};

interface Option {
  value: string;
  label: string;
  icono?: string;
  cantidad?: string;
}

interface CustomSelect2Props {
  options: Option[];
  placeholder: string;
  onChange: (option: Option) => void;
  value: Option | null;
  w?: string;
  opt?: boolean;
  text?: string;
  click?: () => void;
  icon?: boolean;
  desc?: boolean;
}

const mapIconName = (iconName: string) => {
  switch (iconName) {
    case 'ic:outline-home':
      return 'home';
    case 'icomoon-free:office':
      return 'building-o';
    case 'mdi:heart':
      return 'heart';
    default:
      return null;
  }
};

export const CustomSelect2: React.FC<CustomSelect2Props> = ({
  options,
  placeholder,
  onChange,
  value,
  opt = false,
  text,
  click,
  icon = false,
  desc = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={tw`relative w-full z-10`}>
      <TouchableOpacity
        style={[tw`flex-row justify-between items-center px-3 py-4 rounded bg-gray-800`, { width: '100%' }]}
        onPress={toggleDropdown}
      >
        <Text style={tw`text-white`}>{value ? value.label : placeholder}</Text>
        <AntDesign
          name="down"
          size={20}
          color="white"
          style={isOpen ? { transform: [{ rotate: '180deg' }] } : {}}
        />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={FadeIn}
          style={[tw`absolute w-full bg-gray-800 shadow-md mt-1 rounded z-10`, { maxHeight: 200 }]}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const mappedIconName = mapIconName(item.icono || '');
              return (
                <TouchableOpacity
                  style={tw`px-3 py-2 rounded flex-row items-center`}
                  onPress={() => {
                    onChange(item);
                    toggleDropdown();
                  }}
                >
                  <Text style={tw`text-white flex-1`}>{item.label}</Text>
                  {icon && mappedIconName && (
                    <FontAwesome name={mappedIconName} size={16} color="white" style={tw`ml-2`} />
                  )}
                  {desc && item.cantidad && <Text style={tw`text-gray-400 ml-2`}>{item.cantidad}</Text>}
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      )}
      
      {/* Aqui va lo que quite */}	
    </View>
  );
};

/*
          {opt && (
            <TouchableOpacity
              style={tw`flex items-center justify-between p-3 bg-gray-700`}
              onPress={click}
            >
              <Text style={tw`text-white`}>{text}</Text>
              <AntDesign name="plus" size={20} color="white" />
            </TouchableOpacity>
          )}
*/


interface Option2 {
  value: string;
  label: string;
  extraText: string;
  precio: number;
}

interface CustomSelectPlusProps {
  options: Option2[];
  placeholder: string;
  onChange: (selectedOptions: Option2[]) => void;
  value: Option2[];
}

export const CustomSelectPlus: React.FC<CustomSelectPlusProps> = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option2[]>(value);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option2) => {
    const selectedIndex = selectedOptions.findIndex((opt) => opt.value === option.value);
    if (selectedIndex > -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(selectedIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option: Option2) => {
    return selectedOptions.some((opt) => opt.value === option.value);
  };

  return (
    <View style={tw`relative w-full`}>
      <TouchableOpacity
        style={tw`px-3 py-2 border-b-2 border-gray-500`}
        onPress={toggleDropdown}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-white`}>
            {selectedOptions.length > 0 ? selectedOptions.map((opt) => opt.label).join(', ') : placeholder}
          </Text>
          <AntDesign
            name={isOpen ? 'up' : 'down'}
            size={24}
            color="white"
            style={tw`ml-2`}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={tw`absolute top-12 w-full bg-black border-t border-gray-600 z-10 max-h-40`}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`flex-row items-center px-3 py-2 border-b border-gray-700`}
                onPress={() => handleOptionClick(item)}
              >
                <View style={tw`flex-1`}>
                  <Text style={tw`text-white`}>{item.label}</Text>
                  <Text style={tw`text-red-600 text-xs`}>{item.extraText}</Text>
                </View>
                <FontAwesome
                  name={isSelected(item) ? 'check-square' : 'square-o'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

//----------------------------------------------------------------

interface InputDesignnProps extends TextInputProps {
  title: string;
  name: string;
  testID: string;
}

export const InputDesignn: React.FC<InputDesignnProps> = ({ title, name, testID, ...props }) => {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput testID={testID} {...props} />
    </View>
  );
};

interface InputPassworrdProps extends TextInputProps {
  title: string;
  name: string;
  testID: string;
}

export const InputPassworrd: React.FC<InputPassworrdProps> = ({ title, name, testID, ...props }) => {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput testID={testID} secureTextEntry={true} {...props} />
    </View>
  );
};