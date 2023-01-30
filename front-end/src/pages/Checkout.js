import { useContext } from 'react';
import NavBar from '../components/navbar';
import Context from '../Context/Context';
import { requestCheckout, requestSeller } from '../services/request.checkout';

const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function Checkout() {
  const { arrItems, totalPrice, removeCart } = useContext(Context);

  const finalizarPedido = async () => {
    const aloha = await requestSeller('/user/sellers');
    console.log(aloha);
    // const obj = {
    //   sellerName: name,
    //   totalPrice,
    //   deliveryAddress
    // }
    // const { id } = requestCheckout(`/customer/sale`, arrItems);
    // con
  }

  return (
    <div>
      <NavBar />
      <div>
        {arrItems.length ? (
          <div>
            {arrItems.map((element, indice) => (
              <div key={ indice }>
                <p
                  data-testid={ `customer_checkout__element-order-table-item-number-${ indice }` }
                >
                  {indice + 1}
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-name-${ indice }` }
                >
                  {element.name}
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-quantity-${ indice }` }
                >
                  {element.quantity}
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-unit-price-${ indice }`}
                >
                  {numberFormat.format(element.price)}
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-sub-total-${ indice }`}
                >
                  {numberFormat.format(Number(element.quantity) * Number(element.price))}
                </p>
                <button
                onClick={() => removeCart(element.id)}
                  data-testid={ `customer_checkout__element-order-table-remove-${ indice }`}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Carrinho vazio</p>
        )}
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalPrice.toFixed(2).replace('.', ',')}

        </p>
      </div>
      <div>
        <p>Detalhes e Endereço para Entrega</p>
        <div>
        <label for="sellers">P.Vendedora Responsável:</label>
          <select data-testid="customer_checkout__select-seller" id="sellers" name="sellers">
          </select>
          <label for="address">Endereço:</label>
          <input data-testid="customer_checkout__input-address" id="address" name="address">
          </input>
          <label for="address-number">Endereço:</label>
          <input data-testid="customer_checkout__input-address-number" id="address-number" name="address-number">
          </input>
          <button 
          onClick={() => finalizarPedido()}
          data-testid="customer_checkout__button-submit-order" type="button">Finalizar Pedido</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
