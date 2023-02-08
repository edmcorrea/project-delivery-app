import NavBar from '../components/navbar';
import OrdersInfoDetailsComponent from '../components/orders.info.details.';
import ProductsListComponent from '../components/products.list';

function OrdersDetail() {
  return (
    <div>
      <NavBar />
      <div className="page-order-details">
        <OrdersInfoDetailsComponent />
        <ProductsListComponent dataTest="order_details" />
      </div>
    </div>
  );
}

export default OrdersDetail;
