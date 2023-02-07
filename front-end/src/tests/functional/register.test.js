import { screen } from '@testing-library/react';
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
    // BUSCA POR ELEMENTOS
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    // RESULTADOS
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Verify register button behavior - DISABLED', () => {
    // BUSCA POR ELEMENTOS
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    // EVENTOS DA PAGINA
    userEvent.type(name, newCustomerMock.name);
    userEvent.type(email, 'qualquercoisa.pradaerro');
    userEvent.type(password, '123345');

    // RESULTADOS
    expect(validador.test(email.value)).toBeFalsy();
    expect(btnRegister).toHaveProperty('disabled', true);
  });

  it('Verify register button behavior - ENABLED, and error message', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÂO
    api.post = jest.fn().mockImplementation(() => {
      throw new Error('Registro inválido');
    });

    // BUSCA POR ELEMENTOS
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    // EVENTOS DA PAGINA
    userEvent.type(name, customerMock.name);
    userEvent.type(email, customerMock.email);
    userEvent.type(password, '12S334FFF5');

    // RESULTADOS
    expect(validador.test(email.value)).toBeTruthy();
    expect(btnRegister).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA - INTERAÇÂO COM BOTÃO
    userEvent.click(btnRegister);

    // BUSCA POR ELEMENTO - RENDERIZAÇÃO CONDICIONAL
    const errorMessage = await screen
      .findByTestId('common_register__element-invalid_register');

    // RESULTADO
    expect(errorMessage).toHaveTextContent('Registro inválido');
  });

  it('Verify a successful register case', async () => {
    // PREPARAÇÂO - MOCK DE FUNÇÕES
    api.post = jest.fn().mockResolvedValue({ data: newCustomerMock });
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });

    // BUSCA POR ELEMENTOS
    const name = screen.getByTestId(registerNameTestId);
    const email = screen.getByTestId(registerEmailTestId);
    const password = screen.getByTestId(registerPasswordTestId);
    const btnRegister = screen.getByRole('button', { name: /cadastrar/i });

    // EVENTOS DA PAGINA
    userEvent.type(name, newCustomerMock.name);
    userEvent.type(email, newCustomerMock.email);
    userEvent.type(password, '12S334FFF5');

    // RESULTADOS
    expect(validador.test(email.value)).toBeTruthy();
    expect(btnRegister).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA - INTERAÇÂO COM BOTÃO
    userEvent.click(btnRegister);

    // BUSCA POR ELEMENTO EM NOVA ROTA
    const navBarName = await screen
      .findByTestId('customer_products__element-navbar-user-full-name');

    // RESULTADOS
    expect(navBarName).toHaveTextContent(newCustomerMock.name);
    expect(window.location.href).toBe('http://localhost/customer/products');
  });
});
