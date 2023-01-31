import NavBar from '../components/navbar';
import CheckoutComponent from '../components/products.checkout';
import OrdersUserDetailsComponent from '../components/orders.user.details.';

function OrdersDetail() {
  return (
    <div>
      <NavBar />
      <OrdersUserDetailsComponent />
      <CheckoutComponent dataTest='order_details'/>
    </div>
  );
}

export default OrdersDetail;
