import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context/Context';
import {
  requestSaleId,
  requestSaleStatus,
  setToken,
} from '../services/request.sale.id';
import StatusBtn from './status.btn';
import "../styles/order.info.details.css";

function OrdersInfoDetailsComponent() {
  const { id } = useParams();
  const { setProductsOrder } = useContext(Context);

  const [sale, setSale] = useState([]);
  const [sellerStatus, setSellerStatus] = useState('');
  const [disablePrepararPedido, setDisablePrepararPedido] = useState(true);
  const [disableSaiuParaEntrega, setDisableSaiuParaEntrega] = useState(true);
  const [disableMarcarComoEntregue, setDisableMarcarComoEntregue] = useState(true);
  const [userRole, setUserRole] = useState('');

  const requestDB = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const newSale = await requestSaleId(`/sale/${id}`);
    console.log(newSale);
    setProductsOrder(newSale.products);
    setSale(newSale);
    // setSellerStatus(sale.status);
    return newSale.status;
  };

  const verifyStatus = (status) => {
    if (status === 'Pendente') {
      setDisablePrepararPedido(false);
    }
    if (status === 'Preparando') {
      setDisablePrepararPedido(true);
      setDisableSaiuParaEntrega(false);
    }
    if (status === 'Em Trânsito') {
      setDisableSaiuParaEntrega(true);
      setDisableMarcarComoEntregue(false);
    }
    if (status === 'Entregue') {
      setDisableMarcarComoEntregue(true);
    }
  };

  useEffect(async () => {
    const saleStatus = await requestDB();
    verifyStatus(saleStatus);

    const { role } = JSON.parse(localStorage.getItem('user'));
    setUserRole(role);
  }, []);

  useEffect(async () => {
    const saleStatus = await requestDB();
    verifyStatus(saleStatus);
  }, [sellerStatus]);

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
    const request = await requestSaleStatus(`/sale/status/${saleId}`);
    setSellerStatus(request.status);
    // verifyStatus(request.status);
  };

  return (
    <div className='page-info-details'>
      <h2>Detalhes do Pedido</h2>
      <div className='info-details'>
        <p
          data-testid={
            `${userRole}_order_details__element-order-details-label-order-id`
          }
          id="order-id"
          name="order-id"
        >
          PEDIDO:
          {' '}
          {id}
        </p>
        {userRole === 'customer' && (
          <p
            data-testid={
              `${userRole}_order_details__element-order-details-label-seller-name`
            }
            id="seller-name"
            name="seller-name"
          >
            P. Vend:
            {' '}
            {sale.sellerName}
          </p>
        )}
        <p
          data-testid={
            `${userRole}_order_details__element-order-details-label-order-date`
          }
          id="order-date"
          name="order-date"
        >
          {formatDate(sale.saleDate)}
        </p>
        <p
          data-testid={
            `${userRole}_order_details__element-order-details-label-delivery-status`
          }
          id="delivery-status"
          name="delivery-status"
        >
          {sale.status}
        </p>
        <StatusBtn
          disableSaiuParaEntrega={ disableSaiuParaEntrega }
          disablePrepararPedido={ disablePrepararPedido }
          disableMarcarComoEntregue={ disableMarcarComoEntregue }
          updateStatus={ updateStatus }
          sellerId={ sale.id }
        />
      </div>
    </div>
  );
}

export default OrdersInfoDetailsComponent;
