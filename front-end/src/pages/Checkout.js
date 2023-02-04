import AddressComponent from "../components/address.delivery";
import NavBar from "../components/navbar";
import ProductsListComponent from "../components/products.list";
import BuySucess from "./BuySucess";

function Checkout() {
  return (
    <div>
      <NavBar />
      <div className="checkout-page">
        <ProductsListComponent dataTest="checkout" />
        <AddressComponent />
      </div>
        {/* <BuySucess /> */}
    </div>
  );
}

export default Checkout;
