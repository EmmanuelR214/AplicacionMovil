import React from 'react';
import { render } from '@testing-library/react-native';
import { InputDesignn, InputPassworrd } from '../components/Inputs';

describe('Input Components', () => {
  it('renders InputDesignn component with title and testID', () => {
    const { getByText, getByTestId } = render(
      <InputDesignn title="Nombre de usuario" name="username" testID="username-input" />
    );

    // Verifica que el título se renderice
    expect(getByText('Nombre de usuario')).toBeTruthy();

    // Verifica que el campo de entrada se renderice con el testID correcto
    expect(getByTestId('username-input')).toBeTruthy();
  });

  it('renders InputPassworrd component with title, testID, and secureTextEntry', () => {
    const { getByText, getByTestId } = render(
      <InputPassworrd title="Contraseña" name="password" testID="password-input" />
    );

    // Verifica que el título se renderice
    expect(getByText('Contraseña')).toBeTruthy();

    // Verifica que el campo de entrada se renderice con el testID correcto
    const passwordInput = getByTestId('password-input');
    expect(passwordInput).toBeTruthy();

    // Verifica que secureTextEntry esté activado para ocultar el texto
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});