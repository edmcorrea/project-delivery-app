import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Context from "../Context/Context";
import { requestCheckout, requestSeller, setToken } from "../services/request.checkout";

const numberFormat = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
function Checkout() {
  const history = useNavigate();
  const { items, arrItems, totalPrice, removeCart } = useContext(Context);
  const [sellers, setSellers] = useState([]);
  const [sellerName, setsellerName] = useState("Fulana Pereira");
  const [endereco, setEndereco] = useState("");
  const [numEndereco, setNumEndereco] = useState(0);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    if (name === "sellers") setsellerName(value);
    if (name === "address") setEndereco(value);
    if (name === "address-number") setNumEndereco(value);
  };

  useEffect(async () => {
    const sellers = await requestSeller("/user/sellers");
    setSellers(sellers);
  });
  const finalizarPedido = async () => {
    const {token} = JSON.parse(localStorage.getItem('user'));
    // console.log(token);
    try {
      setToken(token);
      const obj = {
        sellerName,
        totalPrice,
        deliveryAddress: endereco,
        deliveryNumber: numEndereco,
        products: items,
      };
      // console.log(obj);
      const {id} = await requestCheckout('/sale', obj);
      // console.log(alo);
      history(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
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
      <div>
        <p>Detalhes e Endereço para Entrega</p>
        <div>
          <label htmlFor="sellers">P.Vendedora Responsável:</label>
          <select
            onChange={handleChange}
            data-testid="customer_checkout__select-seller"
            id="sellers"
            name="sellers"
            value={sellerName}
          >
            {sellers.length &&
              sellers.map(({ name }) => <option>{name}</option>)}
          </select>
          <label htmlFor="address">Endereço:</label>
          <input
            onChange={handleChange}
            data-testid="customer_checkout__input-address"
            id="address"
            name="address"
            value={endereco}
          ></input>
          <label htmlFor="address-number">Número:</label>
          <input
            onChange={handleChange}
            data-testid="customer_checkout__input-address-number"
            id="address-number"
            name="address-number"
            value={numEndereco}
          ></input>
          <button
            onClick={() => finalizarPedido()}
            data-testid="customer_checkout__button-submit-order"
            type="button"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
