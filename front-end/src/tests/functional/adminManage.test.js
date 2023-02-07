import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api as apiUser } from '../../services/request.mangeUser';
import renderWithRouter from '../helpers/renderWith';
import {
  adminMock,
  newSellerMock,
  newUserListMock,
  userListMock,
} from '../helpers/mocks';

describe('Verifications about Admin Manage Page', () => {
  const attributeTestId = 'data-testid';

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(adminMock));
    apiUser.get = jest.fn().mockResolvedValue({ data: userListMock });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if adm manage elements are displayed correctly', async () => {
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const nameInput = screen.getByRole('textbox', { name: /nome:/i });
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText('Senha:');
    const sellerSelect = screen.getByTestId('admin_manage__select-role');
    const registerBtn = screen.getByRole('button', { name: /cadastrar/i });

    // RESULTADOS
    expect(nameInput).toHaveAttribute(attributeTestId, 'admin_manage__input-name');
    expect(emailInput).toHaveAttribute(attributeTestId, 'admin_manage__input-email');
    expect(passwordInput)
      .toHaveAttribute(attributeTestId, 'admin_manage__input-password');
    expect(sellerSelect).toBeInTheDocument();
    expect(registerBtn).toHaveAttribute(attributeTestId, 'admin_manage__button-register');
    expect(registerBtn).toHaveProperty('disabled', true);

    userListMock.forEach((user, i) => {
      // BUSCA POR ELEMENTOS
      const userNumber = screen.getByTestId(
        `admin_manage__element-user-table-item-number-${i + 1}`,
      );
      const userName = screen.getByTestId(
        `admin_manage__element-user-table-name-${i + 1}`,
      );
      const userEmail = screen.getByTestId(
        `admin_manage__element-user-table-email-${i + 1}`,
      );
      const userRole = screen.getByTestId(
        `admin_manage__element-user-table-role-${i + 1}`,
      );
      const userDeteleBtn = screen.getByTestId(
        `admin_manage__element-user-table-remove-${i + 1}`,
      );

      // RESULTADOS
      expect(userNumber).toHaveTextContent(i + 1);
      expect(userName).toHaveTextContent(user.name);
      expect(userEmail).toHaveTextContent(user.email);
      expect(userRole).toHaveTextContent(user.role);
      expect(userDeteleBtn).toHaveTextContent('Excluir');
      expect(userDeteleBtn).toHaveProperty('disabled', false);
    });
  });

  it('Verify if it is possible to register a new user', async () => {
    // PREPARAÇÂO
    apiUser.post = jest.fn().mockResolvedValue({ data: newSellerMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const nameInput = screen.getByRole('textbox', { name: /nome:/i });
    const emailInput = screen.getByRole('textbox', { name: /email:/i });
    const passwordInput = screen.getByLabelText('Senha:');
    const sellerSelect = screen.getByTestId('admin_manage__select-role');
    const registerBtn = screen.getByRole('button', { name: /cadastrar/i });

    // EVENTOS DA PAGINA
    userEvent.type(nameInput, newSellerMock.name);
    userEvent.type(emailInput, newSellerMock.email);
    userEvent.type(passwordInput, '123456789');
    userEvent.selectOptions(sellerSelect, ['seller']);

    // RESULTADOS
    expect(screen.getByRole('option', { name: /vendedor/i }))
      .toHaveProperty('selected', true);
    expect(registerBtn).toHaveProperty('disabled', false);

    // RESET MOCK
    apiUser.get.mockReset();
    apiUser.get = jest.fn().mockResolvedValue({ data: newUserListMock });

    // EVENTO NA PAGINA
    userEvent.click(registerBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.post).toHaveBeenCalled());
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const userNumber = screen.getByTestId(
      'admin_manage__element-user-table-item-number-3',
    );
    const userName = screen.getByTestId(
      'admin_manage__element-user-table-name-3',
    );
    const userEmail = screen.getByTestId(
      'admin_manage__element-user-table-email-3',
    );
    const userRole = screen.getByTestId(
      'admin_manage__element-user-table-role-3',
    );

    // RESULTADOS
    expect(userNumber).toHaveTextContent('3');
    expect(userName).toHaveTextContent(newSellerMock.name);
    expect(userEmail).toHaveTextContent(newSellerMock.email);
    expect(userRole).toHaveTextContent(newSellerMock.role);
    expect(registerBtn).toHaveProperty('disabled', true);
  });

  it('Verify if it is possible to delete a user', async () => {
    // PREPARAÇÂO
    apiUser.delete = jest.fn().mockResolvedValue({ data: {} });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const userName2 = screen.queryByText(userListMock[1].name);
    const userEmail2 = screen.queryByText(userListMock[1].email);
    const userRole2 = screen.queryByText(userListMock[1].role);
    const userDeteleBtn2 = screen.queryAllByRole('button', { name: /excluir/i })[1];

    // RESULTADOS
    expect(userName2).toBeInTheDocument();
    expect(userEmail2).toBeInTheDocument();
    expect(userRole2).toBeInTheDocument();
    expect(userDeteleBtn2).toBeInTheDocument();

    // RESET MOCK
    apiUser.get.mockReset();
    apiUser.get = jest.fn().mockResolvedValue({ data: [userListMock[1]] });

    // EVENTO NA PAGINA
    userEvent.click(userDeteleBtn2);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiUser.delete).toHaveBeenCalled());
    await waitFor(() => expect(apiUser.get).toHaveBeenCalled());

    // RESULTADOS
    expect(userName2).not.toBeInTheDocument();
    expect(userEmail2).not.toBeInTheDocument();
    expect(userRole2).not.toBeInTheDocument();
    expect(userDeteleBtn2).not.toBeInTheDocument();
  });
});
