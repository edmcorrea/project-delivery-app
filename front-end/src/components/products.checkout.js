import { useContext } from "react";
import Context from '../Context/Context';

const numberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function CheckoutComponent() {
  const { arrItems, totalPrice, removeCart } = useContext(Context);

  return (
    <div>
      {arrItems.length ? (
        <div>
          {arrItems.map((element, indice) => (
            <div key={indice}>
              <p
                data-testid={`customer_checkout__element-order-table-item-number-${indice}`}
              >
                {indice + 1}
              </p>
              <p
                data-testid={`customer_checkout__element-order-table-name-${indice}`}
              >
                {element.name}
              </p>
              <p
                data-testid={`customer_checkout__element-order-table-quantity-${indice}`}
              >
                {element.quantity}
              </p>
              <p
                data-testid={`customer_checkout__element-order-table-unit-price-${indice}`}
              >
                {numberFormat.format(element.price)}
              </p>
              <p
                data-testid={`customer_checkout__element-order-table-sub-total-${indice}`}
              >
                {numberFormat.format(
                  Number(element.quantity) * Number(element.price)
                )}
              </p>
              <button
                type="button"
                onClick={() => removeCart(element.id)}
                data-testid={`customer_checkout__element-order-table-remove-${indice}`}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Carrinho vazio</p>
      )}
      <p data-testid="customer_checkout__element-order-total-price">
        {totalPrice.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}

export default CheckoutComponent;
