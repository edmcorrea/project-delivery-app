import { useContext, useEffect } from "react";
import AddressComponent from "../components/address.delivery";
import NavBar from "../components/navbar";
import ProductsListComponent from "../components/products.list";
import Context from "../Context/Context";
import BuySucess from "./BuySucess";

function Checkout() {
  return (
    <div>
      <div>
        <NavBar />
        <div className="checkout-page">
          <ProductsListComponent dataTest="checkout" />
          <AddressComponent />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
