import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../../pages/Login';

describe('Verifications about Login Page', () => {
  it('Verify if Login Page is displayed correctly', () => {
    render(<Login />);

    const login = screen.getByTestId('common_login__input-email');
    const password = screen.getByText(/senha/i);
    const btnRegister = screen.getByRole('button', { name: /tenho/i });

    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Making login in Login Page - BUTTON DISABLED', () => {
    render(<Login />);
    const validador = new RegExp(/\S+@\S+\.\S+/);

    const email = screen.getByTestId('common_login__input-email');
    const password = screen.getByTestId('common_login__input-password');
    const btnLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    expect(validador.test(email.value)).toBeFalsy();
    expect(btnLogin).toHaveProperty('disabled', true);
  });

  it('Making login in Login Page - BUTTON ENABLED', () => {
    render(<Login />);
    const validador = new RegExp(/\S+@\S+\.\S+/);

    // BUSCA POR ELEMENTOS
    const email = screen.getByTestId('common_login__input-email');
    const password = screen.getByTestId('common_login__input-password');
    const btnLogin = screen.getByRole('button', { name: /login/i });

    // EVENTOS DA PAGINA
    userEvent.type(email, 'zebirita@email.com');
    userEvent.type(password, '12S334FFF5');
    userEvent.click(btnLogin);

    // RESULTADOS
    expect(validador.test(email.value)).toBeTruthy();
    expect(btnLogin).toHaveProperty('disabled', false);
  });

  // it('Change router when click in "ainda não tenho conta"', () => {
  //   const { history } = renderWithRouter(<Login />);
  //   const { location: { pathname } } = history;

  //   // BUSCA POR ELEMENTOS
  //   const btnRegister = screen.getByRole('button', { name: /ainda não tenho conta/i })

  //   // EVENTOS DA PAGINA
  //   userEvent.click(btnRegister);
  //   // screen.logTestingPlaygroundURL();

  //   expect(pathname).toBe('/register');
  // });

  // it('Making login in Login Page - SUCESS', () => {
  //   const { history } = renderWithRouter(<Login />);
  //   const { location: { pathname } } = history;

  //   const email = screen.getByTestId('common_login__input-email');
  //   const password = screen.getByTestId('common_login__input-password');
  //   const btnLogin = screen.getByRole('button', { name: /login/i });

  //   userEvent.type(email, 'zebirita@email.com');
  //   userEvent.type(password, '$#zebirita#$');
  //   userEvent.click(btnLogin);

  //   expect(btnLogin).toHaveProperty('disabled', false);
  //   expect(pathname).toBe('/customer/products');
  // });
});
