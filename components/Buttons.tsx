import { View, Text, TouchableOpacity, Image, TouchableOpacityProps, StyleSheet } from "react-native";
import tw from 'tailwind-react-native-classnames';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


interface CategoryButtonProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`flex-row items-center px-3 py-2 rounded-full`,
        selected ? tw`bg-yellow-500` : tw`bg-gray-800`,
        { marginRight: 8 }, // Espacio entre botones
      ]}
    >
      <Text style={selected ? tw`text-black text-sm` : tw`text-gray-400 text-sm`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface CheckoutButtonProps extends TouchableOpacityProps {
  title: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity style={tw`bg-yellow-500 rounded-lg py-3 mt-4`} {...props}>
      <Text style={tw`text-center text-black font-semibold text-lg`}>{title}</Text>
    </TouchableOpacity>
  );
};

type IconName = 'google' | 'facebook' | 'user' | 'sign-in' ;

interface SignInButtonProps { 
  onPress: () => void;
  text: string;
  icon: IconName;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  testID?: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onPress, text, icon, backgroundColor = 'white', textColor = 'black', borderColor, testID }) => {
  return (
    <Animated.View entering={FadeIn.duration(500)} style={tw`w-full px-6`}>
      <TouchableOpacity
        testID={testID}
        style={[
          tw`flex-row items-center justify-center py-3 rounded-full shadow-lg my-2`,
          { backgroundColor, borderWidth: borderColor ? 1 : 0, borderColor: borderColor || 'transparent'}, 
        ]}
        onPress={onPress}
      >
        <FontAwesome name={icon} size={24} color={textColor} style={tw`mr-2`} />
        <Text style={[tw`font-bold text-base`, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface ButtonCountProps {
  count: number;
  setCount: (count: number) => void;
}

export const ButtonCount: React.FC<ButtonCountProps> = ({ count, setCount }) => {
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={tw`flex-row items-center bg-yellow-400 rounded-full p-2`}>
      <TouchableOpacity onPress={decrementCount} style={tw`px-2`}>
        <AntDesign name="minus" size={20} color="black" />
      </TouchableOpacity>
      <Text style={tw`mx-4 text-lg font-semibold text-black`}>{count.toString().padStart(2, '0')}</Text>
      <TouchableOpacity onPress={incrementCount} style={tw`px-2`}>
        <AntDesign name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

interface GoToCartButtonProps {
  onPress: () => void;
}

export const ButtonGoToCart: React.FC<GoToCartButtonProps> = ({ onPress }) => {
  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <FontAwesome name="shopping-cart" size={18} color="white" style={tw`mr-2`} />
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 15, // Para dar el efecto de borde redondeado en la parte derecha
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202020',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

interface ButtonDetalleProps {
  text: string;
  onPress: () => void;
  isSelected: boolean;
}

export const ButtonDetalle: React.FC<ButtonDetalleProps> = ({ text, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        tw`py-2 px-4 rounded mb-2`, 
        isSelected ? tw`bg-red-600` : tw`bg-gray-800`, 
      ]}
      onPress={onPress}
    >
      <Text style={tw`${isSelected ? 'text-white font-bold' : 'text-gray-400'}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};



//--------

interface SignInButtonnProps {
  title: string;
  onPress: () => void;
  testID: string;
}

export const SignInButtonn: React.FC<SignInButtonnProps> = ({ title, onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};