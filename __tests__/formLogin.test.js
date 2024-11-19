
import React from 'react';
import { render } from '@testing-library/react-native';
import { InputDesignn, InputPassworrd } from '../components/Inputs';

describe('Input Components', () => {
  it('renders InputDesignn component with title and testID', () => {
    const { getByText, getByTestId } = render(
      <InputDesignn title="Nombre de usuario" name="username" testID="username-input" />
    );

    expect(getByText('Nombre de usuario')).toBeTruthy();

    expect(getByTestId('username-input')).toBeTruthy();
  });

  it('renders InputPassworrd component with title, testID, and secureTextEntry', () => {
    const { getByText, getByTestId } = render(
      <InputPassworrd title="Contraseña" name="password" testID="password-input" />
    );

    expect(getByText('Contraseña')).toBeTruthy();

    const passwordInput = getByTestId('password-input');
    expect(passwordInput).toBeTruthy();

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
