import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from '../Context/Context';
import { requestSaleId, setToken } from "../services/request.sale.id";

function OrdersUserDetailsComponent() {
  const {id} = useParams();
  const { productOrderDetails } = useContext(Context);

  const [sale, setSale] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const newSale = await requestSaleId(`/sale/${id}`);
    console.log(newSale);
    setSellerId(newSale.id);
    productOrderDetails(newSale.products);
    setSale(newSale);
    if(newSale.status === 'Em Trânsito') {
      setDisableBtn(false);
    }
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().length === 1
      ? `0${newDate.getDate()}`
      : newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().length === 1
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
    return `${day}/${month}/${newDate.getFullYear()}`;
  };

  const updateStatus = async (saleId) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    await requestSaleStatus(`/sale/status/${saleId}`);
  };

  return (
    <div>
        <p>Detalhes do Pedido</p>
       <div> 
        <p data-testid="customer_order_details__element-order-details-label-order-id"
            id="order-id"
            name="order-id">
        PEDIDO:{id}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name"
            id="seller-name"
            name="seller-name">
        P.Vend: {sale.sellerName}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date"
            id="order-date"
            name="order-date">
        {formatDate(sale.saleDate)}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-delivery-status"
            id="delivery-status"
            name="delivery-status">
        {sale.status}
        </p>
        <button
            onClick={() => updateStatus(sellerId)}
            disabled={ disableBtn }
            data-testid="customer_order_details__button-delivery-check"
            id="delivery-check"
            name="delivery-check">
            Entregue
        </button>         
        </div>
    </div>
  );
}

export default OrdersUserDetailsComponent;
