import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCheckout, requestSeller, setToken } from '../services/request.checkout';
import Context from '../Context/Context';
import BuySucess from './buy.sucess';
import '../styles/adress.delivery.css';

function AddressComponent() {
  const history = useNavigate();
  const { totalPrice, setItems } = useContext(Context);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState(2);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'sellers') setSellerId(value);
    if (name === 'address') setAddress(value);
    if (name === 'address-number') setAddressNumber(value);
  };

  const getSellerList = async () => {
    const sellerList = await requestSeller('/user/sellers');
    setSellers(sellerList);
  };

  useEffect(() => {
    getSellerList();
    setRedirect(false);
  }, []);

  const registerOrder = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    try {
      setToken(token);
      const obj = {
        sellerId,
        totalPrice,
        deliveryAddress: address,
        deliveryNumber: addressNumber,
        products: cart,
      };
      const { id } = await requestCheckout('sale', obj);

      history(`/customer/orders/${id}`);
      localStorage.setItem('cart', JSON.stringify([]));
      setItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectPage = async () => {
    const milliseconds = 2000;
    setTimeout(() => {
      registerOrder();
    }, milliseconds);
  };

  return (
    <div className="page-adress-delivery">
      {redirect ? (
        <BuySucess />
      ) : (
        <>
          <h2>Detalhes e Endereço para Entrega</h2>
          <form>
            <label htmlFor="sellers">
              P. Vendedora Responsável:
              <select
                onChange={ handleChange }
                data-testid="customer_checkout__select-seller"
                id="sellers"
                name="sellers"
                value={ sellerId }
              >
                {sellers.length
                  && sellers.map(({ name, id }) => (
                    <option key={ id } value={ id }>
                      {name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="address">
              Endereço:
              <input
                placeholder="Rua Francisco Magalhães"
                onChange={ handleChange }
                data-testid="customer_checkout__input-address"
                id="address"
                name="address"
                value={ address }
              />
            </label>
            <label htmlFor="address-number">
              Número:
              <input
                placeholder="3030"
                onChange={ handleChange }
                data-testid="customer_checkout__input-address-number"
                id="address-number"
                name="address-number"
                value={ addressNumber }
              />
            </label>
          </form>
          <button
            onClick={ () => {
              setRedirect(true);
              redirectPage();
            } }
            data-testid="customer_checkout__button-submit-order"
            type="button"
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
}

export default AddressComponent;
