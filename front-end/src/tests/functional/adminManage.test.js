// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api as apiUser } from '../../services/request.mangeUser';
import renderWithRouter from '../helpers/renderWith';
import {
  adminMock,
  userListMock,
} from '../helpers/mocks';

describe('Verifications about Admin Manage Page', () => {
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

    // BUSCA POR ELEMENTO

    // RESULTADOS
  });
});
