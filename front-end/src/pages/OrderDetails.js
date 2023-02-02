import NavBar from "../components/navbar";
import OrdersInfoDetailsComponent from "../components/orders.info.details.";
import ProductsListComponent from "../components/products.list";

function OrdersDetail() {
  return (
    <div>
      <NavBar />
      <OrdersInfoDetailsComponent />
      <ProductsListComponent dataTest="order_details" />
    </div>
  );
}

export default OrdersDetail;
