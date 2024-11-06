import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { CartItemCard } from '@/components/Cards';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useState} from 'react'
import tw from 'tailwind-react-native-classnames';
import { CheckoutButton } from '@/components/Buttons';

const cartData = [
  {
    id: 1,
    image: require('../../assets/images/react-logo.png'),
    title: 'Grilled skewers',
    price: '13.99',
    quantity: 2,
  },
  {
    id: 2,
    image: require('../../assets/images/react-logo.png'),
    title: 'Thai Spaghetti',
    price: '30.99',
    quantity: 2,
  },
  // Agrega más elementos si es necesario
];

const Carrito = () => {
  const [items, setItems] = useState(cartData);
  const insets = useSafeAreaInsets()

  const handleIncrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const tax = 2.0;
  const delivery = 0.0;
  const total = subtotal + tax;
  return (
    <View style={[tw`flex-1 bg-black`, {paddingTop: insets.top, paddingBottom: insets.bottom} ] }>
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={tw`text-white text-lg font-semibold`}>My Cart List</Text>
        <TouchableOpacity>
          <FontAwesome name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`px-4`}>
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => handleIncrease(item.id)}
            onDecrease={() => handleDecrease(item.id)}
          />
        ))}

        <Text style={tw`text-gray-400 text-center mt-4`}>
          Do you have any discount code?
        </Text>
      </ScrollView>

      {/* Resumen de costos */}
      <View style={tw`bg-gray-900 p-4 rounded-t-3xl`}>
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-400`}>Subtotal</Text>
          <Text style={tw`text-white`}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-400`}>Est. Tax</Text>
          <Text style={tw`text-white`}>${tax.toFixed(2)}</Text>
        </View>
        <View style={tw`flex-row justify-between mt-2`}>
          <Text style={tw`text-gray-400`}>Delivery</Text>
          <Text style={tw`text-white`}>Free</Text>
        </View>
        <View style={tw`border-t border-gray-700 mt-2 my-2`} />
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-white font-semibold text-lg`}>Total</Text>
          <Text style={tw`text-white font-semibold text-lg`}>${total.toFixed(2)}</Text>
        </View>
        
        {/* Botón de Checkout */}
        <CheckoutButton title="Checkout" />
      </View>
    </View>
  )
}

export default Carrito

const styles = StyleSheet.create({})