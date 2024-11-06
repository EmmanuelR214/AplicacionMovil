import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SignInButtonn } from '../components/Buttons';

describe('SignInButtonn Component', () => {
  it('renders button with title and triggers onPress event', () => {
    const mockOnPress = jest.fn();

    const { getByText, getByTestId } = render(
      <SignInButtonn title="Iniciar Sesión" onPress={mockOnPress} testID="signin-button" />
    );

    // Verifica que el título del botón se renderice
    expect(getByText('Iniciar Sesión')).toBeTruthy();

    // Verifica que el botón se renderice con el testID correcto
    const button = getByTestId('signin-button');
    expect(button).toBeTruthy();

    // Simula el evento onPress
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
