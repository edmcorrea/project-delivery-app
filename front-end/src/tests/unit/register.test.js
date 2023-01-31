import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../pages/Register';

const registerNameTestId = 'common_register__input-name';
const registerEmailTestId = 'common_register__input-email';
const registerPasswordTestId = 'common_register__input-password';
const validador = /\S+@\S+\.\S+/;

describe('Verifications about Login Page', () => {
  it('Verify if Login Page is displayed correctly', () => {
    render(
      <Router>
        <Register />
      </Router>,
    );

    const login = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Making login in Login Page - BUTTON DISABLED', () => {
    render(
      <Router>
        <Register />
      </Router>,
    );

    const login = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(login, 'Juazeirinho do norte');
    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    expect(validador.test(email.value)).toBeFalsy();
    expect(btnRegister).toHaveProperty('disabled', true);
  });

  it('Making login in Login Page - BUTTON ENABLED', () => {
    render(
      <Router>
        <Register />
      </Router>,
    );

    // BUSCA POR ELEMENTOS
    const login = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    // EVENTOS DA PAGINA
    userEvent.type(login, 'Juazeirinho do norte');
    userEvent.type(email, 'juajua@email.com');
    userEvent.type(password, '12S334FFF5');
    userEvent.click(btnRegister);

    // RESULTADOS
    expect(validador.test(email.value)).toBeTruthy();
    expect(btnRegister).toHaveProperty('disabled', false);
  });
});
