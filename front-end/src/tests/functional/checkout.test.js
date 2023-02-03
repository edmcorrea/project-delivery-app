import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api } from '../../services/request.checkout';
import renderWithRouter from '../helpers/renderWith';
import { cartMock, customerMock, sellerMock } from '../helpers/mocks';

describe('Verifications about Checkout Page', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(customerMock));
    localStorage.setItem('cart', JSON.stringify(cartMock));
    api.get = jest.fn().mockResolvedValue({ data: [{
      id: 2,
      name: sellerMock.name,
      email: sellerMock.email,
    }] });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  // it('Verify if the checkout page have the correct products list items', async () => {
  //   renderWithRouter(<App />, { route: '/customer/checkout' });

  //   await waitFor(() => expect(api.get).toHaveBeenCalled());

  //   // BUSCA POR ELEMENTOS
  //   const productItem = screen.getByTestId(
  //     'customer_checkout__element-order-table-item-number-1',
  //   );
  //   const productName = screen.getByTestId(
  //     'customer_checkout__element-order-table-name-1',
  //   );
  //   const productQuantity = screen.getByTestId(
  //     'customer_checkout__element-order-table-quantity-1',
  //   );
  //   const productPrice = screen.getByTestId(
  //     'customer_checkout__element-order-table-unit-price-1',
  //   );

  //   // RESULTADOS
  //   expect(productItem).toBeInTheDocument();
  //   expect(productName).toBeInTheDocument();
  //   expect(productQuantity).toBeInTheDocument();
  //   expect(productPrice).toBeInTheDocument();
  // });

  it('Verify if the checkout page have the correct address items', async () => {
    renderWithRouter(<App />, { route: '/customer/checkout' });

    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const seller = screen.getByTestId(
      'customer_checkout__select-seller',
    );
    const inputAddress = screen.getByTestId(
      'customer_checkout__input-address',
    );
    const inputAddressNumber = screen.getByTestId(
      'customer_checkout__input-address-number',
    );
    const submit = screen.getByTestId(
      'customer_checkout__button-submit-order',
    );

    // RESULTADOS
    expect(seller).toBeInTheDocument();
    expect(inputAddress).toBeInTheDocument();
    expect(inputAddressNumber).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  // it('Verify a successful submit buttom case', async () => {
  //   // PREPARAÇÂO - MOCK DE FUNÇÕES
  //   api.post = jest.fn().mockResolvedValue({ data: { id: 1 } });

  //   renderWithRouter(<App />, { route: '/customer/checkout' });

  //   await waitFor(() => expect(api.get).toHaveBeenCalled());

  //   // BUSCA POR ELEMENTOS
  //   const seller = screen.getByTestId(
  //     'customer_checkout__select-seller',
  //   );
  //   const inputAddress = screen.getByTestId(
  //     'customer_checkout__input-address',
  //   );
  //   const inputAddressNumber = screen.getByTestId(
  //     'customer_checkout__input-address-number',
  //   );
  //   const submit = screen.getByTestId(
  //     'customer_checkout__button-submit-order',
  //   );

  //   // EVENTOS DA PAGINA
  //   userEvent.selectOptions(seller, ['2']);
  //   userEvent.type(inputAddress, submitCheckout.deliveryAddress);
  //   userEvent.type(inputAddressNumber, submitCheckout.deliveryNumber);

  //   // RESULTADOS
  //   expect(screen.getByRole('option', { name: 'Fulana Pereira' }).selected).toBe(true);

  //   userEvent.click(submit);

  //   await waitFor(() => expect(api.post).toHaveBeenCalled());

  //   expect(window.location.href).toBe('/customer/orders/1');
  // });
});
