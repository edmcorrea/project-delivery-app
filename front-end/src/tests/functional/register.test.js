import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api } from '../../services/request.register';
import { api as apiProducts } from '../../services/request.products';
import renderWithRouter from '../helpers/renderWith';
import { customerMock, newCustomerMock, productsMock } from '../helpers/mocks';

const registerNameTestId = 'common_register__input-name';
const registerEmailTestId = 'common_register__input-email';
const registerPasswordTestId = 'common_register__input-password';
const validador = /\S+@\S+\.\S+/;

describe('Verifications about Login Page', () => {
  beforeEach(() => {
    localStorage.clear();
    renderWithRouter(<App />, { route: '/register' });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if Register Page elements are displayed correctly', () => {
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Verify register button behavior - DISABLED', () => {
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);

    userEvent.type(name, newCustomerMock.name);
    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    expect(validador.test(email.value)).toBeFalsy();

    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });
    expect(btnRegister).toHaveProperty('disabled', true);
  });

  it('Verify register button behavior - ENABLED, and error message', async () => {
    api.post = jest.fn().mockImplementation(() => {
      throw new Error('Registro inválido');
    });

    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);

    userEvent.type(name, customerMock.name);
    userEvent.type(email, customerMock.email);
    userEvent.type(password, '12S334FFF5');

    expect(validador.test(email.value)).toBeTruthy();

    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });
    expect(btnRegister).toHaveProperty('disabled', false);

    userEvent.click(btnRegister);
    await waitFor(() => expect(api.post).toHaveBeenCalled());

    const errorMessage = screen.getByTestId('common_register__element-invalid_register');
    expect(errorMessage).toHaveTextContent('Registro inválido');
  });

  it('Verify a successful register case', async () => {
    api.post = jest.fn().mockResolvedValue({ data: newCustomerMock });
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });

    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);

    userEvent.type(name, newCustomerMock.name);
    userEvent.type(email, newCustomerMock.email);
    userEvent.type(password, '12S334FFF5');

    expect(validador.test(email.value)).toBeTruthy();

    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });
    expect(btnRegister).toHaveProperty('disabled', false);

    userEvent.click(btnRegister);
    await waitFor(() => expect(api.post).toHaveBeenCalled());
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    const navBarName = screen
      .getByTestId('customer_products__element-navbar-user-full-name');
    expect(navBarName).toHaveTextContent(newCustomerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });
});
