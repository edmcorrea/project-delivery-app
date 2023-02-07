import { screen } from '@testing-library/react';
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
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTOS
    const login = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btnRegister = screen.getByRole('button', { name: /tenho/i });

    // RESULTADOS
    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Verify login button behavior - DISABLED', () => {
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTOS
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btnLogin = screen.getByRole('button', { name: /login/i });

    // EVENTOS DA PAGINA
    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    // RESULTADOS
    expect(validador.test(email.value)).toBeFalsy();
    expect(btnLogin).toHaveProperty('disabled', true);
  });

  it('Verify login button behavior - ENABLED, and login error message', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÂO
    api.post = jest.fn().mockImplementation(() => {
      throw new Error('Login inválido');
    });

    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTOS
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btnLogin = screen.getByRole('button', { name: /login/i });

    // EVENTOS DA PAGINA
    userEvent.type(email, customerMock.email);
    userEvent.type(password, '12S334FFF5');

    // RESULTADOS
    expect(validador.test(email.value)).toBeTruthy();
    expect(btnLogin).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA - INTERAÇÂO COM BOTÃO
    userEvent.click(btnLogin);

    // BUSCA POR ELEMENTO - RENDERIZAÇÃO CONDICIONAL
    const errorMessage = await screen.findByTestId('common_login__element-invalid-email');

    // RESULTADO
    expect(errorMessage).toHaveTextContent('Login inválido');
  });

  it('Verify a successful login case', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÕES
    api.post = jest.fn().mockResolvedValue({ data: customerMock });
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });

    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTOS
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btnLogin = screen.getByRole('button', { name: /login/i });

    // EVENTOS DA PAGINA
    userEvent.type(email, customerMock.email);
    userEvent.type(password, '$#zebirita#$');

    // RESULTADO
    expect(btnLogin).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA - INTERAÇÂO COM BOTÃO
    userEvent.click(btnLogin);

    // BUSCA POR ELEMENTO EM NOVA ROTA
    const navBarName = await screen.findByTestId(navBarTestId);

    // RESULTADOS
    expect(navBarName).toHaveTextContent(customerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });

  it('Verify if the page changes when clicking the register button', () => {
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTO
    const btnRegister = screen.getByRole('button', { name: /ainda não tenho conta/i });

    // EVENTO DA PAGINA
    userEvent.click(btnRegister);

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/register');
  });

  it('Verify redirection to products page when a customer is logged in', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÃO E POPULAR LOCALSTORAGE
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });

    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTO
    const navBarName = await screen.findByTestId(navBarTestId);

    // RESULTADOS
    expect(navBarName).toHaveTextContent(customerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });

  it('Verify redirection to saller orders page when a seller is logged in', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÃO E POPULAR LOCALSTORAGE
    localStorage.setItem('user', JSON.stringify(sellerMock));
    apiSale.get = jest.fn().mockResolvedValue({ data: salesMock });

    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTO
    const navBarName = await screen.findByTestId(navBarTestId);

    // RESULTADOS
    expect(navBarName).toHaveTextContent(sellerMock.name);
    expect(window.location.href).toBe('http://localhost/seller/orders');
  });

  it('Verify redirection to user manage page when a admin is logged in', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÃO E POPULAR LOCALSTORAGE
    localStorage.setItem('user', JSON.stringify(adminMock));
    apiUser.get = jest.fn().mockResolvedValue({ data: userListMock });

    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // BUSCA POR ELEMENTO
    const navBarName = await screen.findByTestId(navBarTestId);

    // RESULTADOS
    expect(navBarName).toHaveTextContent(adminMock.name);
    expect(window.location.href).toBe('http://localhost/admin/manage');
  });
});
