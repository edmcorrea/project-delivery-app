import AddressComponent from "../components/address.delivery";
import NavBar from "../components/navbar";
import ProductsListComponent from "../components/products.list";

function Checkout() {
  return (
    <div>
      <NavBar />
      <ProductsListComponent dataTest="checkout" />
      <AddressComponent />
    </div>
  );
}

export default Checkout;
