import { useContext, useEffect, useState } from "react";
import {
  requestCheckout,
  requestSeller,
  setToken,
} from "../services/request.checkout";
// import { requestSalleId } from "../services/request.sale.id";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { requestSaleId } from "../services/request.sale.id";

function AddressComponent() {
  const history = useNavigate();
  const { items, totalPrice } = useContext(Context);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(2);
  const [endereco, setEndereco] = useState("");
  const [numEndereco, setNumEndereco] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === "sellers") setSellerId(value);
    if (name === "address") setEndereco(value);
    if (name === "address-number") setNumEndereco(value);
  };

  useEffect(async () => {
    const sellerList = await requestSeller("/user/sellers");
    setSellers(sellerList);
    // console.log(sellerList);
    // const sale = await requestSaleId("/sale/1");
    // console.log(sale);
  });

  const finalizarPedido = async () => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    try {
      setToken(token);
      const obj = {
        sellerId,
        totalPrice,
        deliveryAddress: endereco,
        deliveryNumber: numEndereco,
        products: items,
      };
      const { id } = await requestCheckout("sale", obj);

      history(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Detalhes e Endereço para Entrega</p>
      <div>
        <label htmlFor="sellers">
          P.Vendedora Responsável:
          <select
            onChange={handleChange}
            data-testid="customer_checkout__select-seller"
            id="sellers"
            name="sellers"
            value={sellerId}
          >
            {sellers.length &&
              sellers.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            onChange={handleChange}
            data-testid="customer_checkout__input-address"
            id="address"
            name="address"
            value={endereco}
          />
        </label>
        <label htmlFor="address-number">
          Número:
          <input
            onChange={handleChange}
            data-testid="customer_checkout__input-address-number"
            id="address-number"
            name="address-number"
            value={numEndereco}
          />
        </label>
        <button
          onClick={() => finalizarPedido()}
          data-testid="customer_checkout__button-submit-order"
          type="button"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}

export default AddressComponent;
