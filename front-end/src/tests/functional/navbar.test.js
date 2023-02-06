import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api as apiProducts } from '../../services/request.products';
import { api as apiSale } from '../../services/request.sale';
import { api as apiUser } from '../../services/request.mangeUser';
import {
  adminMock,
  customerMock,
  productsMock,
  salesMock,
  sellerMock,
  userListMock,
} from '../helpers/mocks';
import renderWithRouter from '../helpers/renderWith';

describe('Verifications about Login Page', () => {
  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if navbar elements are displayed correctly - customer user', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productsBtn = screen.getByRole('button', { name: /produtos/i });
    const myOrdersBtn = screen.getByRole('button', { name: /meus pedidos/i });
    const managerUserBtn = screen.queryByRole('button', { name: /gerenciar usuários/i });
    const userName = screen.getByRole('heading', { name: customerMock.name });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    // RESULTADOS
    expect(productsBtn).toBeInTheDocument();
    expect(myOrdersBtn).toBeInTheDocument();
    expect(managerUserBtn).not.toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Verify if it is possible to go to orders page and return to products', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    apiSale.get = jest.fn().mockResolvedValue({ data: salesMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const myOrdersBtn = screen.getByRole('button', { name: /meus pedidos/i });

    // EVENTO DA PAGINA
    userEvent.click(myOrdersBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/customer/orders');

    // BUSCA POR ELEMENTOS
    const productsBtn = screen.getByRole('button', { name: /produtos/i });

    // EVENTO DA PAGINA
    userEvent.click(productsBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/customer/products');
  });

  it('Verify if it is possible to logout', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    // EVENTO DA PAGINA
    userEvent.click(logoutBtn);

    // BUSCA POR ELEMENTOS
    const userLS = JSON.parse(localStorage.getItem('user'));

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/login');
    expect(userLS).toBeNull();
  });

  it('Verify if navbar elements are displayed correctly - seller user', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(sellerMock));
    apiSale.get = jest.fn().mockResolvedValue({ data: salesMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productsBtn = screen.queryByRole('button', { name: /produtos/i });
    const myOrdersBtn = screen.getByRole('button', { name: /meus pedidos/i });
    const managerUserBtn = screen.queryByRole('button', { name: /gerenciar usuários/i });
    const userName = screen.getByRole('heading', { name: sellerMock.name });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    // RESULTADOS
    expect(productsBtn).not.toBeInTheDocument();
    expect(myOrdersBtn).toBeInTheDocument();
    expect(managerUserBtn).not.toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Verify if navbar elements are displayed correctly - admin user', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(adminMock));
    apiUser.get = jest.fn().mockResolvedValue({ data: userListMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productsBtn = screen.queryByRole('button', { name: /produtos/i });
    const myOrdersBtn = screen.queryByRole('button', { name: /meus pedidos/i });
    const managerUserBtn = screen.getByRole('button', { name: /gerenciar usuários/i });
    const userName = screen.getByRole('heading', { name: adminMock.name });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    // RESULTADOS
    expect(productsBtn).not.toBeInTheDocument();
    expect(myOrdersBtn).not.toBeInTheDocument();
    expect(managerUserBtn).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Verify if it is possible to g to admin manage page', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(adminMock));
    apiUser.get = jest.fn().mockResolvedValue({ data: userListMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const managerUserBtn = screen.getByRole('button', { name: /gerenciar usuários/i });

    // EVENTO DA PAGINA
    userEvent.click(managerUserBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/admin/manage');
  });
});
