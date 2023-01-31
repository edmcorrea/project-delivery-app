import AddressComponent from '../components/address.delivery';
import NavBar from '../components/navbar';
import CheckoutComponent from '../components/products.checkout';

function Checkout() {
  return (
    <div>
      <NavBar />
      <CheckoutComponent dataTest='checkout'/>
      <AddressComponent />
    </div>
  );
}

export default Checkout;
