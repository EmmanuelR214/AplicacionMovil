// src/components/CustomButton.js
import React from 'react';
import { Button, Div, Icon, Text } from 'react-native-magnus';
import { Pressable } from 'react-native';


export const CustomButton = ({
  title,
  onPress,
  bg = 'blue600',
  color = 'white',
  iconName,
  iconColor = 'white',
  iconSize = 'md',
  rounded = 'md',
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      bg={bg}
      color={color}
      onPress={onPress}
      block
      rounded={rounded}
      disabled={disabled || loading}
      alignSelf="center"
      {...props}
    >
      {iconName && (
        <Icon
          name={iconName}
          color={iconColor}
          fontSize={iconSize}
          mr="sm"
        />
      )}
      {loading ? (
        <Div row justifyContent="center" alignItems="center">
          <Text fontSize="lg" color={color}>
            Cargando...
          </Text>
        </Div>
      ) : (
        <Text fontSize="lg" color={color}>
          {title}
        </Text>
      )}
    </Button>
  );
};

export const SocialButton = ({ iconName, iconFamily, label, bgColor, textColor, isCompact, onPress }) => {
  return (
    <Button
      bg={bgColor || 'white'}
      rounded="lg"
      h={isCompact ? 50 : 60}
      w={isCompact ? 100 : '100%'}
      m={isCompact ? 'xs' : 'md'}
      row
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
      shadow="sm"
    >
      <Icon
        name={iconName}
        fontFamily={iconFamily}
        fontSize={24}
        color={isCompact ? (textColor || 'black') : (bgColor || 'white')}
        mr={isCompact ? 0 : 'md'}
      />
      {!isCompact && (
        <Text color={textColor || 'black'}>{label}</Text>
      )}
    </Button>
  );
};

export const CheckBox = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked); // Llama a la función onChange si está definida
  };

  return (
    <Pressable onPress={toggleCheck}>
      <Div row alignItems="center">
        <Div
          borderWidth={2}
          borderColor={isChecked ? 'blue700' : 'gray400'}
          bg={isChecked ? 'blue700' : 'white'}
          h={24}
          w={24}
          justifyContent="center"
          alignItems="center"
          rounded="md"
          mr="md"
        >
          {isChecked && <Icon name="check" color="white" fontSize="xl" />}
        </Div>
        {label && <Text fontSize="lg">{label}</Text>}
      </Div>
    </Pressable>
  );
};