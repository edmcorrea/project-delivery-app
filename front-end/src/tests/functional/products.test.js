import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { api } from '../../services/request.products';
import { customerMock, productsMock } from '../helpers/mocks';
import renderWithRouter from '../helpers/renderWith';

describe('Verifications about Login Page', () => {
  const zeroTotalPrice = 'Total: R$ 0,00';

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(customerMock));
    api.get = jest.fn().mockResolvedValue({ data: productsMock });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Verify if Customer products Page elements are displayed correctly', async () => {
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const productsBtn = screen.getByRole('button', { name: /produtos/i });
    const myOrdersBtn = screen.getByRole('button', { name: /meus pedidos/i });
    const userName = screen.getByRole('heading', { name: customerMock.name });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    const totalPriceBtn = screen.getByTestId('customer_products__button-cart');

    // RESULTADOS
    expect(productsBtn).toBeInTheDocument();
    expect(myOrdersBtn).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
    expect(totalPriceBtn).toHaveTextContent(zeroTotalPrice);

    // ELEMENTOS DOS CARDS
    productsMock.forEach((product, i) => {
      const price = screen.getByTestId(`customer_products__element-card-price-${i + 1}`);
      const image = screen.getByTestId(`customer_products__img-card-bg-image-${i + 1}`);
      const name = screen.getByTestId(`customer_products__element-card-title-${i + 1}`);
      const quantityInput = screen
        .getByTestId(`customer_products__input-card-quantity-${i + 1}`);
      const addBtn = screen
        .getByTestId(`customer_products__button-card-add-item-${i + 1}`);
      const removeBtn = screen
        .getByTestId(`customer_products__button-card-rm-item-${i + 1}`);

      expect(price).toHaveTextContent(product.price.toString().replace(/\./, ','));
      expect(image).toBeInTheDocument();
      expect(name).toHaveTextContent(product.name);
      expect(quantityInput).toHaveValue('0');
      expect(addBtn).toHaveTextContent('+');
      expect(removeBtn).toHaveTextContent('-');
    });
  });

  it('Verify if it is possible to add and remove products from order cart', async () => {
    // PREPARAÇÂO - RENDERIZAÇÂO DA PÀGINA
    renderWithRouter(<App />);

    // AGUARDAR AÇÃO ASSÍNCRONA
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // BUSCA POR ELEMENTOS
    const addBtn = screen.getAllByRole('button', { name: /\+/i })[0];
    const removeBtn = screen.getAllByRole('button', { name: /-/i })[0];
    const quantityInput = screen
      .getByTestId('customer_products__input-card-quantity-1');
    const totalPriceBtn = screen.getByTestId('customer_products__button-cart');

    // RESULTADOS
    expect(totalPriceBtn).toHaveTextContent(zeroTotalPrice);
    expect(totalPriceBtn).toHaveProperty('disabled', true);

    // EVENTOS DA PAGINA
    const addClicks = 3;
    for (let i = 0; i < addClicks; i += 1) {
      userEvent.click(addBtn);
    }

    // RESULTADO
    expect(totalPriceBtn).toHaveTextContent('Total: R$ 6,60');
    expect(totalPriceBtn).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA
    const removeClicks = 2;
    for (let i = 0; i < removeClicks; i += 1) {
      userEvent.click(removeBtn);
    }

    // RESULTADO
    expect(totalPriceBtn).toHaveTextContent('Total: R$ 2,20');
    expect(totalPriceBtn).toHaveProperty('disabled', false);

    // EVENTOS DA PAGINA
    userEvent.clear(quantityInput);

    // RESULTADO
    expect(totalPriceBtn).toHaveTextContent(zeroTotalPrice);
    expect(totalPriceBtn).toHaveProperty('disabled', true);
  });
});
