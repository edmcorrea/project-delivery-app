import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api } from '../../services/request.login';
import { api as apiProducts } from '../../services/request.products';
import { api as apiSale } from '../../services/request.sale';
import { api as apiUser } from '../../services/request.mangeUser';
import renderWithRouter from '../helpers/renderWith';
import {
  adminMock,
  customerMock,
  productsMock,
  salesMock,
  sellerMock,
  userListMock,
} from '../helpers/mocks';

const emailTestId = 'common_login__input-email';
const passwordTestId = 'common_login__input-password';
const validador = /\S+@\S+\.\S+/;
const navBarTestId = 'customer_products__element-navbar-user-full-name';

describe('Verifications about Login Page', () => {
  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if Login Page elements are displayed correctly', () => {
    localStorage.clear();
    renderWithRouter(<App />);

    const login = screen.getByTestId(emailTestId);
    const password = screen.getByText(/senha/i);
    const btnRegister = screen.getByRole('button', { name: /tenho/i });

    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Verify login button behavior - DISABLED', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btnLogin = screen.getByRole('button', { name: /login/i });

    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    expect(validador.test(email.value)).toBeFalsy();
    expect(btnLogin).toHaveProperty('disabled', true);
  });

  it('Verify login button behavior - ENABLED, and login error message', async () => {
    api.post = jest.fn().mockImplementation(() => {
      throw new Error('Login inválido');
    });
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);

    userEvent.type(email, customerMock.email);
    userEvent.type(password, '12S334FFF5');

    expect(validador.test(email.value)).toBeTruthy();

    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).toHaveProperty('disabled', false);

    userEvent.click(btnLogin);
    await waitFor(() => expect(api.post).toHaveBeenCalled());

    const errorMessage = screen.getByTestId('common_login__element-invalid-email');
    expect(errorMessage).toHaveTextContent('Login inválido');
  });

  it('Verify a successful login case', async () => {
    api.post = jest.fn().mockResolvedValue({ data: customerMock });
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);

    userEvent.type(email, customerMock.email);
    userEvent.type(password, '$#zebirita#$');

    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).toHaveProperty('disabled', false);

    userEvent.click(btnLogin);
    await waitFor(() => expect(api.post).toHaveBeenCalled());
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    const navBarName = screen.getByTestId(navBarTestId);
    expect(navBarName).toHaveTextContent(customerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });

  it('Verify if the page changes when clicking the register button', () => {
    renderWithRouter(<App />);

    const btnRegister = screen.getByRole('button', { name: /ainda não tenho conta/i });

    userEvent.click(btnRegister);

    expect(window.location.href).toBe('http://localhost/register');
  });

  it('Verify redirection to products page when a customer is logged in', async () => {
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    const navBarName = screen.getByTestId(navBarTestId);
    expect(navBarName).toHaveTextContent(customerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });

  it('Verify redirection to saller orders page when a seller is logged in', async () => {
    localStorage.setItem('user', JSON.stringify(sellerMock));
    apiSale.get = jest.fn().mockResolvedValue({ data: salesMock });
    renderWithRouter(<App />);

    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    const navBarName = screen.getByTestId(navBarTestId);
    expect(navBarName).toHaveTextContent(sellerMock.name);
    expect(window.location.href).toBe('http://localhost/seller/orders');
  });

  it('Verify redirection to user manage page when a admin is logged in', async () => {
    localStorage.setItem('user', JSON.stringify(adminMock));
    apiUser.get = jest.fn().mockResolvedValue({ data: userListMock });
    renderWithRouter(<App />);

    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    const navBarName = screen.getByTestId(navBarTestId);
    expect(navBarName).toHaveTextContent(adminMock.name);
    expect(window.location.href).toBe('http://localhost/admin/manage');
  });
});
