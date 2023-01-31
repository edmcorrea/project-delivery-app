import { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import RemoveCartBtn from "./remove.cart.btn";

const numberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function CheckoutComponent({ dataTest }) {
  const { arrItems, totalPrice, productsOrder } = useContext(Context);
  const [arrMap, setArrMap] = useState([]);

  useEffect(() => {
    if(dataTest === 'checkout') {
      setArrMap(arrItems);
    } else {
      setArrMap(productsOrder);
    }
  })
  return (
    <div>
      {arrMap.length ? (
        <div>
          {arrMap.map((element, indice) => (
            <div key={indice}>
              <p
                data-testid={`customer_${dataTest}__element-order-table-item-number-${indice}`}
              >
                {indice + 1}
              </p>
              <p
                data-testid={`customer_${dataTest}__element-order-table-name-${indice}`}
              >
                {element.name}
              </p>
              <p
                data-testid={`customer_${dataTest}__element-order-table-quantity-${indice}`}
              >
                {element.quantity}
              </p>
              <p
                data-testid={`customer_${dataTest}__element-order-table-unit-price-${indice}`}
              >
                {numberFormat.format(element.price)}
              </p>
              <p
                data-testid={`customer_${dataTest}__element-order-table-sub-total-${indice}`}
              >
                {numberFormat.format(
                  Number(element.quantity) * Number(element.price)
                )}
              </p>
              {dataTest === "checkout" && (
                <RemoveCartBtn
                  dataTest={dataTest}
                  id={element.id}
                  indice={indice}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Carrinho vazio</p>
      )}
      <p data-testid={`customer_${dataTest}__element-order-total-price`}>
        {totalPrice.toFixed(2).replace(".", ",")}
      </p>
    </div>
  );
}

export default CheckoutComponent;
