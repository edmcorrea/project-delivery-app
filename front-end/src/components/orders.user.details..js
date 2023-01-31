import { useContext } from "react";
import { useParams } from "react-router-dom";
import Context from '../Context/Context';
import { requestSaleId } from "../services/request.sale.id";

function OrdersUserDetailsComponent() {
  const {id} = useParams();
  const { productOrderDetails } = useContext(Context);

  const [sale, setSale] = useState([]);
  const [saleStatus, setSaleStatus] = useState([]);

  useEffect(async () => {
    const newSale = await requestSaleId(`/sale/:${id}`);
    productOrderDetails(newSale.products);
    setSale(newSale);
  });

  const updateStatus = async (saleId) => {
    const newSaleStatus = await requestSaleStatus(`/sale/status/:${saleId}`);
    setSaleStatus(newSaleStatus);
  }

  return (
    <div>
        <p>Detalhes do Pedido</p>
       <div> 
        <p data-testid="customer_order_details__element-order-details-label-order-id"
            id="order-id"
            name="order-id">
        PEDIDO:{id};
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name"
            id="seller-name"
            name="seller-name">
        P.Vend: {sale.sellerName};
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date"
            id="order-date"
            name="order-date">
        {sale.saleDate};
        </p>
        <p data-testid="customer_order_details__element-order-details-label-delivery-status"
            id="delivery-status"
            name="delivery-status">
        {sale.status};
        </p>
        <button
            onClick={() => updateStatus()} 
            data-testid="customer_order_details__button-delivery-checkout"
            id="delivery-checkoout"
            name="delivery-checkout">
        {saleStatus};
        </button>         
        </div>
    </div>
  );
}

export default OrdersUserDetailsComponent;
