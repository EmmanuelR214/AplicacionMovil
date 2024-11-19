  import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../app/(tabs)/Home';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('tailwind-react-native-classnames', () => () => ({
  flex1: { flex: 1 },
  bgBlack: { backgroundColor: 'black' },
}));

jest.mock('@/components/Cards', () => {
  const { View, Text } = require('react-native');
  return {
    FoodCard: ({ title, price }) => (
      <View testID="food-card">
        <Text>{title}</Text>
        <Text>{price}</Text>
      </View>
    ),
  };
});

jest.mock('@/components/Contents', () => {
  const { View } = require('react-native');
  return {
    CategorySelector: () => <View testID="category-selector" />,
    FoodCarousel: () => <View testID="food-carousel" />,
  };
});

jest.mock('@/components/Modal', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    DrawerComponent: ({ visible, onClose }) => (
      visible ? (
        <View testID="drawer-component">
          <Text>Drawer</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      ) : null
    ),
  };
});

beforeAll(() => {
  useSafeAreaInsets.mockReturnValue({ top: 0, right: 0, bottom: 0, left: 0 });
});

// describe('Home Screen', () => {
//   it('renders the main elements of the Home screen', () => {
//     const { getByText, getAllByTestId } = render(<Home />);

//     expect(getByText('Hi, Arnold')).toBeTruthy();
//     expect(getByText('Ready to cook for dinner?')).toBeTruthy();

//     expect(getAllByTestId('food-carousel')).toBeTruthy();
//     expect(getAllByTestId('category-selector')).toBeTruthy();

//     const foodCards = getAllByTestId('food-card');
//     expect(foodCards.length).toBeGreaterThan(0); 
//   });

//   it('opens and closes the drawer component', () => {
//     const { getByText, queryByTestId } = render(<Home />);

//     const drawerButton = getByText('A');
//     fireEvent.press(drawerButton);
//     expect(queryByTestId('drawer-component')).toBeTruthy();

//     const closeDrawerButton = getByText('Cerrar');
//     fireEvent.press(closeDrawerButton);
//     expect(queryByTestId('drawer-component')).toBeNull();
//   });
// });