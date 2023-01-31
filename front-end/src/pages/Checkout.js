import AddressComponent from '../components/address.delivery';
import NavBar from '../components/navbar';
import CheckoutComponent from '../components/products.checkout';

function Checkout() {
  return (
    <div>
      <NavBar />
      <CheckoutComponent />
      <AddressComponent />
    </div>
  );
}

export default Checkout;
