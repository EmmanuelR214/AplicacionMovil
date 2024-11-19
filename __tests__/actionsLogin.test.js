global.FormData = class FormData {
  constructor() {
    this.data = {};
  }
  append(key, value) {
    this.data[key] = value;
  }
};

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SignInButtonn } from '../components/Buttons';

describe('SignInButtonn Component', () => {
  it('renders button with title and triggers onPress event', () => {
    const mockOnPress = jest.fn();

    const { getByText, getByTestId } = render(
      <SignInButtonn title="Iniciar Sesión" onPress={mockOnPress} testID="signin-button" />
    );

    expect(getByText('Iniciar Sesión')).toBeTruthy();

    const button = getByTestId('signin-button');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
