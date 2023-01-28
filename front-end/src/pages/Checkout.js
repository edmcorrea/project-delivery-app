import { useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import Context from "../Context/Context";
import { requestProducts } from "../services/request.products";

function Checkout() {
  const { arrItems, totalPrice } = useContext(Context);
  console.log();
  return (
    <div>
      <NavBar />
      <div>
        {arrItems.length ? (
          <div>
            {arrItems.map((element, indice) => (
              <div key={indice + 1}>
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
                  {element.price.toFixed(2).replace(".", ",")}
                </p>
                <p
                  data-testid={`customer_checkout__element-order-table-sub-total-${indice}`}
                >
                  {element.quantity * element.price}
                </p>
                <button
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
        <p
          data-testid={"customer_checkout__element-order-total-price"}
        >{`Total: R$${totalPrice.toFixed(2).replace(".", ",")}`}</p>
      </div>
    </div>
  );
}

export default Checkout;
