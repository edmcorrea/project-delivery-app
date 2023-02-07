import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api as apiSale } from '../../services/request.sale';
import { api as apiSaleId } from '../../services/request.sale.id';
import { api as apiProducts } from '../../services/request.products';
import renderWithRouter from '../helpers/renderWith';
import {
  customerMock,
  emTransitoMock,
  entregueMock,
  preparandoMock,
  productsMock,
  saleMockEmTransito2,
  saleMockEntregue2,
  saleMockPendente,
  salesMock,
  sellerMock,
} from '../helpers/mocks';

describe('Verifications about Order Details Page', () => {
  beforeEach(() => {
    apiSale.get = jest.fn().mockResolvedValue({ data: salesMock });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if order details elements are displayed correctly', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(sellerMock));
    apiSaleId.get = jest.fn().mockResolvedValue({ data: saleMockPendente });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTO - ORDERS PAGE
    const firstSalesStatus = screen.getByTestId(
      'seller_orders__element-delivery-status-1',
    );

    // EVENTO DA PAGINA
    userEvent.click(firstSalesStatus);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const orderId = screen.getByTestId(
      'seller_order_details__element-order-details-label-order-id',
    );
    const saleDate = screen.getByTestId(
      'seller_order_details__element-order-details-label-order-date',
    );
    const saleStatus = screen.getByTestId(
      'seller_order_details__element-order-details-label-delivery-status',
    );
    const preparingBtn = screen.getByRole('button', { name: /preparar pedido/i });
    const dispatchBtn = screen.getByRole('button', { name: /saiu para entrega/i });

    // RESULTADOS
    expect(orderId).toHaveTextContent(`PEDIDO: ${saleMockPendente.id}`);
    expect(saleDate).toHaveTextContent('26/01/2023');
    expect(saleStatus).toHaveTextContent(saleMockPendente.status);
    expect(preparingBtn).toHaveProperty('disabled', false);
    expect(dispatchBtn).toHaveProperty('disabled', true);
  });

  it('Verify if it is possible to change order status by seller', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(sellerMock));
    apiSaleId.get = jest.fn().mockResolvedValue({ data: saleMockPendente });
    apiSaleId.patch = jest.fn().mockResolvedValue({ data: preparandoMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTO - ORDERS PAGE
    const firstSalesStatus = screen.getByTestId(
      'seller_orders__element-delivery-status-1',
    );

    // EVENTO DA PAGINA
    userEvent.click(firstSalesStatus);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const saleStatus = screen.getByTestId(
      'seller_order_details__element-order-details-label-delivery-status',
    );
    const preparingBtn = screen.getByRole('button', { name: /preparar pedido/i });
    const dispatchBtn = screen.getByRole('button', { name: /saiu para entrega/i });

    // RESULTADOS
    expect(saleStatus).toHaveTextContent(saleMockPendente.status);
    expect(preparingBtn).toHaveProperty('disabled', false);
    expect(dispatchBtn).toHaveProperty('disabled', true);

    // EVENTO DA PAGINA
    userEvent.click(preparingBtn);

    // AGUARDAR AÇÕES ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.patch).toHaveBeenCalled());

    // RESULTADOS
    expect(saleStatus).toHaveTextContent(preparandoMock.status);
    expect(preparingBtn).toHaveProperty('disabled', true);
    expect(dispatchBtn).toHaveProperty('disabled', false);

    // RESET MOCKS
    apiSaleId.patch.mockReset();
    apiSaleId.patch = jest.fn().mockResolvedValue({ data: emTransitoMock });

    // EVENTO DA PAGINA
    userEvent.click(dispatchBtn);

    // AGUARDAR AÇÕES ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.patch).toHaveBeenCalled());

    // RESULTADOS
    expect(saleStatus).toHaveTextContent(emTransitoMock.status);
    expect(preparingBtn).toHaveProperty('disabled', true);
    expect(dispatchBtn).toHaveProperty('disabled', true);
  });

  it('Verify if it is possible to change order status by customer', async () => {
    // PREPARAÇÂO
    localStorage.setItem('user', JSON.stringify(customerMock));
    apiProducts.get = jest.fn().mockResolvedValue({ data: productsMock });
    apiSaleId.get = jest.fn().mockResolvedValue({ data: saleMockEmTransito2 });
    apiSaleId.patch = jest.fn().mockResolvedValue({ data: entregueMock });
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiProducts.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTO - PRODUCTS PAGE
    const myOrdersBtn = screen.getByRole('button', { name: /meus pedidos/i });

    // EVENTO DA PAGINA
    userEvent.click(myOrdersBtn);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSale.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTO - ORDERS PAGE
    const secondSalesStatus = screen.getByTestId(
      'customer_orders__element-delivery-status-2',
    );

    // EVENTO DA PAGINA
    userEvent.click(secondSalesStatus);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const saleStatus = screen.getByTestId(
      'customer_order_details__element-order-details-label-delivery-status',
    );
    const entregueBtn = screen.getByRole('button', { name: /entregue/i });

    // RESULTADOS
    expect(saleStatus).toHaveTextContent(saleMockEmTransito2.status);
    expect(entregueBtn).toHaveProperty('disabled', false);

    // EVENTO DA PAGINA
    userEvent.click(entregueBtn);

    // AGUARDAR AÇÕES ASSÍNCRONA
    await waitFor(() => expect(apiSaleId.patch).toHaveBeenCalled());

    // RESULTADOS
    expect(saleStatus).toHaveTextContent(saleMockEntregue2.status);
    expect(entregueBtn).toHaveProperty('disabled', true);
  });
});
