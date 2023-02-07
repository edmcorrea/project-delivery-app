import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api as apiRequest } from '../../services/request.checkout';
import { api as apiProducts } from '../../services/request.products';
import { api as apiSaleId } from '../../services/request.sale.id';
import renderWithRouter from '../helpers/renderWith';
import {
  customerMock,
  productsMock,
  saleMock,
  sellerMock,
  submitCheckout,
} from '../helpers/mocks';

describe('Verifications about Checkout Page', () => {
  const totalPriceBtnTestId = 'customer_products__button-cart';

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiRequest.get = jest.fn().mockResolvedValue({ data: [{
      id: 2,
      name: sellerMock.name,
      email: sellerMock.email,
    }] });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if the checkout page have the correct products list items', async () => {
    // PREPARAÇÃO
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA - PÁGINA PRODUCTS
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS - PÁGINA PRODUCTS
    const addBtn1 = screen.getAllByRole('button', { name: /\+/i })[0];
    const totalPriceBtn = screen.getByTestId(totalPriceBtnTestId);

    // EVENTOS DA PAGINA - PÁGINA PRODUCTS
    const addClicks = 3;
    for (let i = 0; i < addClicks; i += 1) {
      userEvent.click(addBtn1);
    }

    // EVENTO DA PAGINA - PÁGINA PRODUCTS
    userEvent.click(totalPriceBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiRequest.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productItem = screen.getByTestId(
      'customer_checkout__element-order-table-item-number-0',
    );
    const productName = screen.getByTestId(
      'customer_checkout__element-order-table-name-0',
    );
    const productQuantity = screen.getByTestId(
      'customer_checkout__element-order-table-quantity-0',
    );
    const productPrice = screen.getByTestId(
      'customer_checkout__element-order-table-unit-price-0',
    );
    const removeCarBtn = screen.getByTestId(
      'customer_checkout__element-order-table-remove-0',
    );

    // RESULTADOS
    expect(productItem).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(removeCarBtn).toBeInTheDocument();
  });

  it('Verify if the checkout page have the address form - car empty', async () => {
    // PREPARAÇÃO
    renderWithRouter(<App />, { route: '/customer/checkout' });

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiRequest.get).toHaveBeenCalled());

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

  it('Verify remove cart button', async () => {
    // PREPARAÇÃO
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA - PÁGINA PRODUCTS
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS - PÁGINA PRODUCTS
    const addBtn1 = screen.getAllByRole('button', { name: /\+/i })[0];
    const addBtn2 = screen.getAllByRole('button', { name: /\+/i })[1];
    const totalPriceBtn = screen.getByTestId(totalPriceBtnTestId);

    // EVENTOS DA PAGINA - PÁGINA PRODUCTS
    userEvent.click(addBtn1);
    userEvent.click(addBtn2);

    // EVENTO DA PAGINA - PÁGINA PRODUCTS
    userEvent.click(totalPriceBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiRequest.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productName = screen.getByTestId(
      'customer_checkout__element-order-table-name-0',
    );
    const removeCarBtn = screen.getByTestId(
      'customer_checkout__element-order-table-remove-0',
    );
    const totalPrice = screen.getByTestId(
      'customer_checkout__element-order-total-price',
    );

    // RESULTADOS
    expect(productName).toHaveTextContent(productsMock[0].name);
    expect(totalPrice).toHaveTextContent('9,70');

    // EVENTOS DA PAGINA
    userEvent.click(removeCarBtn);

    // RESULTADOS
    expect(productName).toHaveTextContent(productsMock[1].name);
    expect(totalPrice).toHaveTextContent('7,50');
  });

  it('Verify a successful checkout submit case', async () => {
    // PREPARAÇÃO
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    apiRequest.post = jest.fn().mockResolvedValue({ data: { id: 1 } });
    apiSaleId.get = jest.fn().mockResolvedValue({ data: saleMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA - PÁGINA PRODUCTS
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS - PÁGINA PRODUCTS
    const addBtn1 = screen.getAllByRole('button', { name: /\+/i })[0];
    const totalPriceBtn = screen.getByTestId(totalPriceBtnTestId);

    // EVENTOS DA PAGINA - PÁGINA PRODUCTS
    const addClicks = 3;
    for (let i = 0; i < addClicks; i += 1) {
      userEvent.click(addBtn1);
    }

    // EVENTO DA PAGINA - PÁGINA PRODUCTS
    userEvent.click(totalPriceBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiRequest.get).toHaveBeenCalled());

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

    // EVENTOS DA PAGINA
    userEvent.selectOptions(seller, ['2']);
    userEvent.type(inputAddress, submitCheckout.deliveryAddress);
    userEvent.type(inputAddressNumber, submitCheckout.deliveryNumber);

    // RESULTADO
    expect(screen.getByRole('option', { name: 'Fulana Pereira' }).selected).toBe(true);

    // EVENTO DA PAGINA
    userEvent.click(submit);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitForElementToBeRemoved(
      screen.queryByText(/compra realizada com sucessso/i),
      { timeout: 2000 },
    );
    await waitFor(() => expect(apiRequest.post).toHaveBeenCalled());
    await waitFor(() => expect(apiSaleId.get).toHaveBeenCalled());

    // RESULTADO
    expect(window.location.href).toBe('http://localhost/customer/orders/1');
  });
});
