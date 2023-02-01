import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context/Context';
import { requestSaleId, requestSaleStatus, setToken } from '../services/request.sale.id';
import BtnCustomerEntregue from './btn.customer.entregue';
import StatusCartBtn from './status.cart.btn';

function OrdersUserDetailsComponent() {
  const { id } = useParams();
  const { setProductsOrder, userRole } = useContext(Context);
  const statusId = `${userRole}_order_details__element-order-details-label-delivery-status`;

  const [sale, setSale] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [sellerStatus, setSellerStatus] = useState('Pendente');
  const [disableBtnInTransit, setDisableBtnInTransit] = useState(true);
  const [disableBtnDelivered, setDisableBtnDelivered] = useState(true);
  const [disableBtnPreparing, setDisableBtnPreparing] = useState(false);

  useEffect(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const newSale = await requestSaleId(`/sale/${id}`);
    console.log(newSale);
    setSellerId(newSale.id);
    setProductsOrder(newSale.products);
    setSale(newSale);
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

  const updateStatus = async (saleId, status) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    if(status === 'Pendente') {
      const request = await requestSaleStatus(`/sale/status/${saleId}`);
      setSellerStatus(request.status);
    }
    if(status === 'Preparando') {
      const request = await requestSaleStatus(`/sale/status/${saleId}`);
      setSellerStatus(request.status);
    }
    if(status === 'Em Trânsito') {
      const request = await requestSaleStatus(`/sale/status/${saleId}`);
      ssetSellerStatus(request.status);
    }
  };

  useEffect( async () => {
    const newSale = await requestSaleId(`/sale/${id}`);
    setSale(newSale);
    if (newSale.status === 'Em Trânsito') {
      setDisableBtnDelivered(false);
    }
    if (newSale.status === 'Preparando') {
      setDisableBtnInTransit(false);
      setDisableBtnPreparing(true)
    }
    console.log('entrei');
  }, [sellerStatus])

  return (
    <div>
      <p>Detalhes do Pedido</p>
      <div>
        <p
          data-testid={`${userRole}_order_details__element-order-details-label-order-id`}
          id="order-id"
          name="order-id"
        >
          PEDIDO:
          {id}
        </p>
        {userRole === 'customer' && <p
          data-testid={`${userRole}_order_details__element-order-details-label-seller-name`}
          id="seller-name"
          name="seller-name"
        >
          P.Vend:
          {' '}
          {sale.sellerName}
        </p>}
        <p
          data-testid={`${userRole}_order_details__element-order-details-label-order-date`}
          id="order-date"
          name="order-date"
        >
          {formatDate(sale.saleDate)}
        </p>
        <p
          data-testid={statusId}
          id="delivery-status"
          name="delivery-status"
        >
          {sale.status}
        </p>
        {userRole === 'seller'
        && <StatusCartBtn
            disableDelivered={disableBtnInTransit}
            disablePreparing={disableBtnPreparing}
            updateStatus = {updateStatus}
            sellerId = {sellerId}
          />}
        { userRole === 'customer'
        && <BtnCustomerEntregue
            disableBtn={disableBtnDelivered}
            updateStatus={updateStatus}
            sellerId={sellerId}
          />}
      </div>
    </div>
  );
}

export default OrdersUserDetailsComponent;
