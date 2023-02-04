import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestCheckout,
  requestSeller,
  setToken,
} from "../services/request.checkout";
// import { requestSalleId } from "../services/request.sale.id";
import Context from "../Context/Context";
import "../styles/adress.delivery.css";

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
  }, []);

  const finalizarPedido = async () => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    try {
      setToken(token);
      const obj = {
        sellerId,
        totalPrice,
        deliveryAddress: endereco,
        deliveryNumber: numEndereco,
        products: cart,
      };
      const { id } = await requestCheckout("sale", obj);

      history(`/customer/orders/${id}`);
      localStorage.setItem("cart", JSON.stringify([]));
      setItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-adress-delivery">
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <label htmlFor="sellers">
          P. Vendedora Responsável:
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
            placeholder='Rua Francisco Magalhães'
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
            placeholder='3030'
            onChange={handleChange}
            data-testid="customer_checkout__input-address-number"
            id="address-number"
            name="address-number"
            value={numEndereco}
          />
        </label>
      </form>
      <button
        onClick={() => finalizarPedido()}
        data-testid="customer_checkout__button-submit-order"
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default AddressComponent;
